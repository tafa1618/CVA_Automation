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
  { id: '1', name: '320-07', type: 'Machine', parts_rate: 7500, lubricants_rate: 1900, sos_rate: 900, mo_rate: 9000 },
  { id: '2', name: '330D', type: 'Machine', parts_rate: 9100, lubricants_rate: 2700, sos_rate: 900, mo_rate: 9000 },
  { id: '3', name: 'D6T', type: 'Machine', parts_rate: 13200, lubricants_rate: 4100, sos_rate: 1200, mo_rate: 10800 },
  { id: '4', name: '966L', type: 'Machine', parts_rate: 11100, lubricants_rate: 3300, sos_rate: 900, mo_rate: 9000 },
  { id: '5', name: 'DE450', type: 'GE Prime', parts_rate: 5100, lubricants_rate: 1700, sos_rate: 600, mo_rate: 7200 },
  { id: '6', name: 'DE110', type: 'GE Standby', parts_rate: 3100, lubricants_rate: 900, sos_rate: 600, mo_rate: 6000 },
];

export const locations = [
  { name: 'Dakar', travel_rate: 0 },
  { name: 'Thies', travel_rate: 3000 },
  { name: 'Saly', travel_rate: 4500 },
  { name: 'Saint-Louis', travel_rate: 9000 },
  { name: 'Kedougou', travel_rate: 15000 },
];

export const pmAccuracyData = [
  { month: 'Sep', compliant: 78, overdue: 22 },
  { month: 'Oct', compliant: 82, overdue: 18 },
  { month: 'Nov', compliant: 80, overdue: 20 },
  { month: 'Dec', compliant: 85, overdue: 15 },
  { month: 'Jan', compliant: 88, overdue: 12 },
  { month: 'Feb', compliant: 82, overdue: 18 },
];

export const fulfillmentByPillar = [
  { pillar: 'SOS', score_cva1: 65, score_cva2: 85 },
  { pillar: 'Inspection', score_cva1: 45, score_cva2: 92 },
  { pillar: 'Connectivité', score_cva1: 78, score_cva2: 88 },
];

export const serviceCommitmentData = {
  active_fleet: 450,
  under_contract: 154,
  renewals_predicted: 28,
  support_tickets: 12,
  average_response: '4.2h'
};
