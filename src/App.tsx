/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { 
  Header, 
  Dashboard, 
  CatalogView, 
  OrdersView, 
  OSLOperations, 
  AdminView 
} from './components';
import { COMMODITIES, INITIAL_ORDERS } from './constants';

// --- Types ---
type OrderStatus = 'draft' | 'submitted' | 'approved' | 'completed' | 'flagged';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
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
}

interface Order {
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
  notify: string;
  readyDate: string;
  weight: number;
  volume: number;
  remarks: string;
  items: { product: Product, qty: number }[];
}

// Map COMMODITIES to the Product type expected by the app
const PRODUCTS: Product[] = COMMODITIES.map(c => ({
  id: c.id.toString(),
  name: c.name,
  sku: `SKU-${c.id}`,
  category: c.category,
  price: c.price,
  stock: c.stock,
  useCase: 'Standard medical use',
  shelfLife: '36 Months',
  shape: c.name.toLowerCase().includes('kit') ? 'kit' : (c.name.toLowerCase().includes('mask') ? 'mask' : 'glove'),
  description: `${c.name} for healthcare facilities.`,
  usage: 'Follow standard protocols.',
  dosage: 'N/A',
  included: `Standard ${c.unit} packaging.`,
  storage: 'Cool, dry place.',
  list: ['Quality certified', 'Sterile packaging', 'WHO approved']
}));

// Map INITIAL_ORDERS to the Order type
const MAPPED_ORDERS: Order[] = INITIAL_ORDERS.map(o => ({
  id: o.id,
  ref: (o as any).pateoRef || o.id,
  name: 'Authorized Personnel',
  address: `${o.country} Office`,
  date: o.date,
  value: o.items.reduce((acc, item) => acc + item.commodity.price * item.qty, 0),
  status: (o.status.toLowerCase().includes('draft') ? 'draft' : 
           o.status.toLowerCase().includes('submitted') ? 'submitted' : 
           o.status.toLowerCase().includes('approved') ? 'approved' : 'completed') as OrderStatus,
  initiator: 'Regional Logistics Hub',
  shipmentMode: 'Air Freight',
  pteao: (o as any).pateoRef || '',
  consignee: `${o.country} Health Ministry`,
  notify: 'logistics@who.int',
  readyDate: 'TBD',
  weight: 0,
  volume: 0,
  remarks: (o as any).notes || '',
  items: o.items.map(item => ({
    product: PRODUCTS.find(p => p.name === item.commodity.name) || PRODUCTS[0],
    qty: item.qty
  }))
}));

export default function App() {
  const [currentUser] = useState({
    name: 'Dr. Alex Laurent',
    role: 'Super Admin',
    country: 'Switzerland'
  });
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cart, setCart] = useState<{ product: Product, qty: number }[]>([]);
  const [orders, setOrders] = useState<Order[]>(MAPPED_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const addToCart = (product: Product, qty: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { product, qty }];
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      ref: `REF-${Math.floor(Math.random() * 10000)}`,
      name: currentUser.name,
      address: `${currentUser.country} Office`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      value: cart.reduce((acc, item) => acc + item.product.price * item.qty, 0),
      status: 'draft',
      initiator: 'HCOMS Portal User',
      shipmentMode: 'Air Freight',
      pteao: '',
      consignee: 'Regional Hub',
      notify: 'logistics@who.int',
      readyDate: 'TBD',
      weight: 0,
      volume: 0,
      remarks: 'Order placed via catalog.',
      items: [...cart]
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setActiveTab('orders');
    setSelectedOrderId(newOrder.id);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleProfileSettings = () => {
    console.log('Opening profile settings...');
  };

  const handleOrderClick = (orderId: string) => {
    setActiveTab('orders');
    setSelectedOrderId(orderId);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Toaster position="top-right" />
      
      <Header 
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        onProfileSettings={handleProfileSettings}
        onOrderClick={handleOrderClick}
      />

      <main className="max-w-7xl mx-auto p-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'catalog' && (
          <CatalogView 
            products={PRODUCTS} 
            onAddToCart={addToCart} 
            onCheckout={handleCheckout} 
          />
        )}
        {activeTab === 'orders' && (
          <OrdersView 
            orders={orders} 
            onUpdateStatus={updateOrderStatus}
            selectedOrderId={selectedOrderId}
            setSelectedOrderId={setSelectedOrderId}
          />
        )}
        {activeTab === 'osl-operations' && (
          <OSLOperations 
            orders={orders} 
            onUpdateStatus={updateOrderStatus} 
          />
        )}
        {activeTab === 'admin' && <AdminView />}
        
        {/* Placeholder for other views */}
        {['drafts', 'review', 'inventory'].includes(activeTab) && (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h2 className="text-2xl font-bold text-gray-400 italic">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} View Implementation in Progress...
            </h2>
          </div>
        )}
      </main>
    </div>
  );
}
