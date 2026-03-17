/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { 
  Header, 
  Sidebar,
  DashboardView, 
  CatalogView, 
  OrdersView, 
  OSLOperations, 
  WarehouseManagement,
  WHOOrderForm,
  MoScriptToast
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
  dimensions: c.dimensions,
  uom: c.uom
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
           o.status.toLowerCase().includes('approved') ? 'under_coordination' : 'completed') as OrderStatus,
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
  description: 'Emergency replenishment for regional hub',
  version: '1.0',
  purpose: 'Response - Stock replenishment for emergency operations',
  estimatedNbParcels: 12,
  estimatedShipCost: 1250,
  freightChargesPayable: 'WHO',
  shippingDocumentsRequired: 'Packing list, Release note, Airway bill',
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
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [aiLogs, setAiLogs] = useState<{id: string, msg: string, time: string}[]>([]);

  // Global AI Coordination Simulation
  React.useEffect(() => {
    const coordinating = orders.find(o => o.status === 'under_coordination');
    if (coordinating) {
      const timer = setTimeout(() => {
        setAiLogs(prev => [
          { id: coordinating.id, msg: `AI Coordinator: Analyzing inventory for ${coordinating.ref}...`, time: new Date().toLocaleTimeString() },
          ...prev
        ]);
        
        setTimeout(() => {
          setAiLogs(prev => [
            { id: coordinating.id, msg: `AI Coordinator: FEFO check complete. Sourcing options identified.`, time: new Date().toLocaleTimeString() },
            ...prev
          ]);
          updateOrderStatus(coordinating.id, 'options_prepared');
        }, 2000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [orders]);

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
    setShowOrderForm(true);
  };

  const confirmOrder = (formData: any) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      ref: `REF-${Math.floor(Math.random() * 10000)}`,
      name: currentUser.name,
      address: formData.address,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      value: cart.reduce((acc, item) => acc + item.product.price * item.qty, 0),
      status: 'submitted', // Start as submitted as per WHO form submission
      initiator: currentUser.name,
      shipmentMode: formData.shipmentMode,
      pteao: formData.pteao,
      consignee: formData.consignee,
      notify: formData.notify,
      readyDate: 'TBD',
      weight: 0,
      volume: 0,
      remarks: formData.remarks || 'Order placed via WHO Order Request Form.',
      processingUnit: 'OSL-HUB-01',
      goodsCost: cart.reduce((acc, item) => acc + item.product.price * item.qty, 0),
      requesterRef: `REQ-${Math.floor(Math.random() * 10000)}`,
      requestedReadyDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      confirmedReadyDate: 'TBD',
      dimensions: 'TBD',
      confirmedWeight: 0,
      confirmedVolume: 0,
      description: formData.description,
      version: '1.0',
      purpose: formData.purpose,
      estimatedNbParcels: Math.ceil(cart.length * 1.5),
      estimatedShipCost: 0,
      freightChargesPayable: formData.freightChargesPayable,
      shippingDocumentsRequired: formData.shippingDocumentsRequired,
      items: [...cart]
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setShowOrderForm(false);
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
        userRole={currentUser.role}
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
          {activeTab === 'dashboard' && <DashboardView />}
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
          {activeTab === 'operations' && (
            <OSLOperations 
              orders={orders} 
              onUpdateStatus={updateOrderStatus} 
              onOrderClick={handleOrderClick}
            />
          )}
          {activeTab === 'warehouse' && (
            <WarehouseManagement 
              orders={orders} 
              onUpdateStatus={updateOrderStatus} 
            />
          )}
          
          {showOrderForm && (
            <WHOOrderForm 
              cart={cart} 
              currentUser={currentUser} 
              onSubmit={confirmOrder} 
              onCancel={() => setShowOrderForm(false)} 
            />
          )}

          <MoScriptToast logs={aiLogs} onClear={() => setAiLogs([])} />

          {/* Fallback for any legacy tabs that might still be triggered */}
          {['admin', 'offer', 'review', 'drafts', 'laboratory', 'statistic', 'inventory'].includes(activeTab) && (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
              <h2 className="text-2xl font-bold text-gray-400 italic">
                This section has been consolidated into one of the 5 main tabs.
              </h2>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
