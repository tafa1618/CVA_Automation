
import pandas as pd
import os
import math
from sqlalchemy import select, update, delete
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import AsyncSession
from models import Machine, Client, RemoteService, CVAF, SuiviPS, InspectionRate

async def ingest_programmes_data(file_path: str, session: AsyncSession) -> dict:
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    print("Reading Excel file...")
    try:
        df = pd.read_excel(file_path)
    except Exception as e:
        raise ValueError(f"Error reading excel: {e}")

    row_count = len(df)
    print(f"Found {row_count} rows.")

    client_rows = df[['ID client', 'Nom de compte client', 'Numéro de compte client']].drop_duplicates(subset=['ID client'])
    client_inserts = []
    for _, row in client_rows.iterrows():
        ext_id = row['ID client']
        if pd.isna(ext_id): continue
        try: ext_id = int(ext_id)
        except: continue
        client_inserts.append({
            "external_id": str(ext_id),
            "name": str(row['Nom de compte client']) if not pd.isna(row['Nom de compte client']) else "Unknown",
            "account_number": str(row['Numéro de compte client']) if not pd.isna(row['Nom de compte client']) else None
        })
    
    clients_processed = 0
    if client_inserts:
        stmt = insert(Client).values(client_inserts)
        stmt = stmt.on_conflict_do_update(
            index_elements=['external_id'],
            set_=dict(name=stmt.excluded.name, account_number=stmt.excluded.account_number)
        )
        await session.execute(stmt)
        clients_processed = len(client_inserts)
    
    result = await session.execute(select(Client))
    client_map = {c.external_id: c.id for c in result.scalars().all()}

    machine_inserts = []
    for _, row in df.iterrows():
        serial = row.get('N° série du matériel')
        if pd.isna(serial): continue
        serial = str(serial).strip()
        ext_client_id = row.get('ID client')
        client_db_id = None
        if not pd.isna(ext_client_id):
            try: client_db_id = client_map.get(str(int(ext_client_id)))
            except: pass
        lat, lon = row.get('LATITUDE'), row.get('LONGITUDE')
        valid_coords = False
        if not pd.isna(lat) and not pd.isna(lon):
            try:
                lat, lon = float(lat), float(lon)
                if -90 <= lat <= 90 and -180 <= lon <= 180: valid_coords = True
            except: pass
        machine_inserts.append({
            "serial_number": serial,
            "make": str(row.get('Marque')).strip() if not pd.isna(row.get('Marque')) else None,
            "model": str(row.get('Modèle')).strip() if not pd.isna(row.get('Modèle')) else None,
            "family": str(row.get('Famille de produits')).strip() if not pd.isna(row.get('Famille de produits')) else None,
            "service_meter": row.get("Compteur d'entretien (Heures)"),
            "status": str(row.get("Dernier statut matériel remonté")).strip() if not pd.isna(row.get("Dernier statut matériel remonté")) else None,
            "latitude": lat if valid_coords else None,
            "longitude": lon if valid_coords else None,
            "client_id": client_db_id
        })

    machines_processed = 0
    if machine_inserts:
        chunk_size = 1000
        for i in range(0, len(machine_inserts), chunk_size):
            chunk = machine_inserts[i:i+chunk_size]
            stmt = insert(Machine).values(chunk)
            stmt = stmt.on_conflict_do_update(
                index_elements=['serial_number'],
                set_=dict(service_meter=stmt.excluded.service_meter, status=stmt.excluded.status, latitude=stmt.excluded.latitude, longitude=stmt.excluded.longitude, client_id=stmt.excluded.client_id)
            )
            await session.execute(stmt)
        machines_processed = len(machine_inserts)

    cvaf_processed = 0
    try:
        # Check for sheet names to decide processing logic
        xl = pd.ExcelFile(file_path)
        
        if 'CVAF' in xl.sheet_names:
            cvaf_df = pd.read_excel(file_path, sheet_name='CVAF')
            print("Processing CVAF sheet from CVAF_DATA format...")
            cvaf_inserts = []
            for _, row in cvaf_df.iterrows():
                serial = row.get('Serial Number')
                if pd.isna(serial): continue
                cvaf_inserts.append({
                    "serial_number": str(serial).strip(),
                    "start_date": str(row.get('Start Date')) if not pd.isna(row.get('Start Date')) else None,
                    "end_date": str(row.get('End Date')) if not pd.isna(row.get('End Date')) else None,
                    "cva_type": row.get('Cva Type'),
                    "labor_type": None, # Not present in this format
                    "country_code": row.get('Country Code'),
                    "product_vertical": row.get('Product Vertical'),
                    "dlr_cust_nm": row.get('Dlr Cust Nm'),
                    "inspection_score": str(row.get('Inspection Score')) if not pd.isna(row.get('Inspection Score')) else None,
                    "connectivity_score": str(row.get('Connectivity Score')) if not pd.isna(row.get('Connectivity Score')) else None,
                    "sos_score": str(row.get('Sos Score')) if not pd.isna(row.get('Sos Score')) else None
                })
        else:
            # Assume it's the CVA Metrics format (default sheet or first sheet)
            cvaf_df = pd.read_excel(file_path)
            print("Processing CVA Metrics format...")
            cvaf_inserts = []
            
            def map_labor_type(val):
                if pd.isna(val): return None
                val_str = str(val).upper().strip()
                if "DIM-PM CUSTOMER" in val_str:
                    return "CVA 1"
                elif "DIFM-PM DEALER" in val_str:
                    return "CVA 2"
                return str(val)

            for _, row in cvaf_df.iterrows():
                serial = row.get('Serial Number')
                if pd.isna(serial): continue
                
                # Check column names as they might differ
                cva_type_val = row.get('CVA Type')
                labor_type = map_labor_type(cva_type_val)
                
                cvaf_inserts.append({
                    "serial_number": str(serial).strip(),
                    "start_date": str(row.get('Start Date')) if not pd.isna(row.get('Start Date')) else None,
                    "end_date": str(row.get('End Date')) if not pd.isna(row.get('End Date')) else None,
                    "cva_type": str(row.get('CVA Origin')) if 'CVA Origin' in row else None,
                    "labor_type": labor_type,
                    "country_code": str(row.get('Rpt Mkt Regn Abr Nm')) if 'Rpt Mkt Regn Abr Nm' in row else None,
                    "product_vertical": row.get('Product Vertical'),
                    "dlr_cust_nm": row.get('Customer Name'),
                    "inspection_score": None,
                    "connectivity_score": None,
                    "sos_score": None
                })

        if cvaf_inserts:
            res = await session.execute(select(Machine.serial_number))
            existing_serials = set(res.scalars().all())
            valid_cvafs = [c for c in cvaf_inserts if c['serial_number'] in existing_serials]
            if valid_cvafs:
                stmt = insert(CVAF).values(valid_cvafs)
                stmt = stmt.on_conflict_do_update(
                    index_elements=['serial_number'],
                    set_=dict(
                        start_date=stmt.excluded.start_date, 
                        end_date=stmt.excluded.end_date, 
                        labor_type=stmt.excluded.labor_type,
                        cva_type=stmt.excluded.cva_type,
                        country_code=stmt.excluded.country_code,
                        dlr_cust_nm=stmt.excluded.dlr_cust_nm,
                        inspection_score=stmt.excluded.inspection_score, 
                        connectivity_score=stmt.excluded.connectivity_score, 
                        sos_score=stmt.excluded.sos_score
                    )
                )
                await session.execute(stmt)
                cvaf_processed = len(valid_cvafs)
    except Exception as e:
        print(f"CVAF error: {e}")

    return {"clients": clients_processed, "machines": machines_processed, "cvaf": cvaf_processed}
