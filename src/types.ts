export type OrderStatus = 'draft' | 'submitted' | 'approved' | 'completed' | 'flagged';

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
  items: { product: Product, qty: number }[];
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
