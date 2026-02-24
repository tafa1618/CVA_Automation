export interface CVAMachine {
  serial_number: string;
  model: string;
  client: string;
  latitude: number;
  longitude: number;
  hours: number;
  cva_type: string;
  labor_type: 'CVA 1' | 'CVA 2'; // CVA 1: Client Labor, CVA 2: Dealer Labor
  inspection_score: string;
  sos_score: string;
  connectivity_score: string;
  fulfillment_score: number;
  region: string;
  status: 'excellent' | 'advanced' | 'emerging' | 'non-scoring';
}

export const mockMachines: CVAMachine[] = [
  {
    serial_number: 'MWP03344',
    model: '330D',
    client: 'AFRICA TECHNIQUE SERVICE',
    latitude: 11.16653,
    longitude: -4.19139,
    hours: 567.8,
    cva_type: 'Renewal',
    labor_type: 'CVA 2',
    inspection_score: '1/1',
    sos_score: '0/0',
    connectivity_score: '1/1',
    fulfillment_score: 85,
    region: 'Sénégal',
    status: 'excellent',
  },
  {
    serial_number: 'M7800322',
    model: 'CS78BLRC',
    client: 'IRIBAT',
    latitude: 6.92698,
    longitude: -6.05211,
    hours: 4069.1,
    cva_type: 'New Aftermarket',
    labor_type: 'CVA 1',
    inspection_score: '1/1',
    sos_score: '1/1',
    connectivity_score: '0/0',
    fulfillment_score: 65,
    region: 'Côte d\'Ivoire',
    status: 'advanced',
  },
  {
    serial_number: 'DKJ21161',
    model: '320-07GC',
    client: 'BEGEC TP',
    latitude: 10.09220,
    longitude: -13.63519,
    hours: 1016.8,
    cva_type: 'Renewal',
    labor_type: 'CVA 2',
    inspection_score: '0/1',
    sos_score: '0/0',
    connectivity_score: '1/1',
    fulfillment_score: 45,
    region: 'Guinée',
    status: 'emerging',
  },
  {
    serial_number: 'FSL10625',
    model: '966L',
    client: 'WAHGNION GOLD OPERATIONS SA',
    latitude: 10.5,
    longitude: -3.8,
    hours: 12450.5,
    cva_type: 'Renewal',
    labor_type: 'CVA 1',
    inspection_score: '1/1',
    sos_score: '1/1',
    connectivity_score: '1/1',
    fulfillment_score: 95,
    region: 'Burkina Faso',
    status: 'excellent',
  },
  {
    serial_number: 'GCT02337',
    model: 'D6T',
    client: 'QGMI BENIN',
    latitude: 6.4,
    longitude: 2.3,
    hours: 890.2,
    cva_type: 'New Aftermarket',
    labor_type: 'CVA 2',
    inspection_score: '0/0',
    sos_score: '0/0',
    connectivity_score: '0/1',
    fulfillment_score: 10,
    region: 'Bénin',
    status: 'non-scoring',
  }
];

export const kpiStats = {
  fulfillment_avg: 68,
  pm_accuracy: 82,
  inspection_rate: 55,
  remote_service: 42,
  active_contracts: 154,
  renewals_due: 12
};

export interface QuotationModel {
  id: string;
  name: string;
  type: 'Machine' | 'GE Prime' | 'GE Standby';
  parts_rate: number;
  lubricants_rate: number;
  sos_rate: number;
  mo_rate: number;
}

export const quotationModels: QuotationModel[] = [
  { id: '1', name: '320-07', type: 'Machine', parts_rate: 12.5, lubricants_rate: 3.2, sos_rate: 1.5, mo_rate: 15.0 },
  { id: '2', name: '330D', type: 'Machine', parts_rate: 15.2, lubricants_rate: 4.5, sos_rate: 1.5, mo_rate: 15.0 },
  { id: '3', name: 'D6T', type: 'Machine', parts_rate: 22.1, lubricants_rate: 6.8, sos_rate: 2.0, mo_rate: 18.0 },
  { id: '4', name: '966L', type: 'Machine', parts_rate: 18.5, lubricants_rate: 5.5, sos_rate: 1.5, mo_rate: 15.0 },
  { id: '5', name: 'DE450', type: 'GE Prime', parts_rate: 8.5, lubricants_rate: 2.8, sos_rate: 1.0, mo_rate: 12.0 },
  { id: '6', name: 'DE110', type: 'GE Standby', parts_rate: 5.2, lubricants_rate: 1.5, sos_rate: 1.0, mo_rate: 10.0 },
];

export const locations = [
  { name: 'Dakar', travel_rate: 0 },
  { name: 'Thies', travel_rate: 5.0 },
  { name: 'Saly', travel_rate: 7.5 },
  { name: 'Saint-Louis', travel_rate: 15.0 },
  { name: 'Kedougou', travel_rate: 25.0 },
];
