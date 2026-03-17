/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { 
  Header, 
  Sidebar,
  Dashboard, 
  CatalogView, 
  OrdersView, 
  OSLOperations, 
  AdminView,
  StatisticView,
  InventoryView,
  DraftsView,
  LaboratoryView
} from './components';
import { COMMODITIES, INITIAL_ORDERS } from './constants';
import { Order, OrderStatus, Product } from './types';

// Map COMMODITIES to the Product type expected by the app
const PRODUCTS: Product[] = COMMODITIES.map(c => ({
  id: c.id.toString(),
  name: c.name,
  sku: c.sku,
  category: c.category,
  categoryLabel: c.categoryLabel,
  price: c.price,
  stock: c.stock,
  useCase: c.useCase,
  shelfLife: c.shelfLife,
  shape: c.shape as any,
  description: c.description,
  usage: c.usage,
  dosage: c.dosage,
  included: c.included,
  storage: c.storage,
  list: c.list,
  weight: c.weight,
  dimensions: c.dimensions
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
  processingUnit: 'OSL-HUB-01',
  goodsCost: o.items.reduce((acc, item) => acc + item.commodity.price * item.qty, 0),
  requesterRef: o.id,
  requestedReadyDate: o.date,
  confirmedReadyDate: 'TBD',
  dimensions: '120x80x100 cm',
  confirmedWeight: 45.5,
  confirmedVolume: 0.96,
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
      processingUnit: 'OSL-HUB-01',
      goodsCost: cart.reduce((acc, item) => acc + item.product.price * item.qty, 0),
      requesterRef: `REQ-${Math.floor(Math.random() * 10000)}`,
      requestedReadyDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      confirmedReadyDate: 'TBD',
      dimensions: 'TBD',
      confirmedWeight: 0,
      confirmedVolume: 0,
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
    <div className={`app-container ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Toaster position="top-right" />
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <div className="main-content">
        <Header 
          currentUser={currentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
          onProfileSettings={handleProfileSettings}
          onOrderClick={handleOrderClick}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="content-area">
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
          {activeTab === 'statistic' && <StatisticView />}
          {activeTab === 'osl-operations' && (
            <OSLOperations 
              orders={orders} 
              onUpdateStatus={updateOrderStatus} 
            />
          )}
          {activeTab === 'admin' && <AdminView />}
          {activeTab === 'inventory' && <InventoryView products={PRODUCTS} />}
          {activeTab === 'drafts' && (
            <DraftsView 
              orders={orders} 
              onUpdateStatus={updateOrderStatus} 
              onSelectOrder={handleOrderClick} 
            />
          )}
          {activeTab === 'laboratory' && <LaboratoryView />}
          
          {/* Placeholder for other views */}
          {['offer', 'review'].includes(activeTab) && (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
              <h2 className="text-2xl font-bold text-gray-400 italic">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} View Implementation in Progress...
              </h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
