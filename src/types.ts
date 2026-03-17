export type OrderStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_coordination' 
  | 'options_prepared' 
  | 'awaiting_country_decision' 
  | 'country_option_accepted' 
  | 'stock_reserved' 
  | 'stock_released' 
  | 'shipped' 
  | 'completed' 
  | 'flagged' 
  | 'exception_raised';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  categoryLabel: string;
  price: number;
  stock: number;
  useCase: string;
  shelfLife: string;
  shape: 'kit' | 'mask' | 'glove';
  description: string;
  usage: string;
  dosage: string;
  included: string;
  storage: string;
  list: string[];
  weight: string;
  dimensions: string;
  uom: string;
  image?: string;
}

export interface Order {
  id: string;
  ref: string;
  name: string;
  address: string;
  date: string;
  value: number;
  status: OrderStatus;
  initiator: string;
  shipmentMode: string;
  pteao: string;
  consignee: string;
  processingUnit: string;
  goodsCost: number;
  requesterRef: string;
  notify: string;
  readyDate: string;
  requestedReadyDate: string;
  confirmedReadyDate: string;
  dimensions: string;
  weight: number;
  confirmedWeight: number;
  volume: number;
  confirmedVolume: number;
  remarks: string;
  items: { product: Product, qty: number, batch?: string, expiry?: string }[];
  // New WHO Form Fields
  description?: string;
  version?: string;
  purpose?: string;
  estimatedNbParcels?: number;
  estimatedShipCost?: number;
  nbParcels?: number;
  nbBoxes?: number;
  freightChargesPayable?: string;
  shippingDocumentsRequired?: string;
  exceptions?: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  last_login: string;
  country?: string;
  osl_admin_level?: number;
  warehouse_id?: number;
  must_change_password?: boolean;
}
