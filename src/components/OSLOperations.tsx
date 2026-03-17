import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, 
  ArrowUpDown, 
  Filter, 
  CheckCircle2, 
  Zap, 
  Package, 
  ShieldAlert, 
  Layers, 
  Beaker,
  Activity,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Cpu,
  Truck,
  Box
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import ReviewView from './ReviewView';

interface OSLOperationsProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onOrderClick?: (id: string) => void;
}

const LaboratorySection = () => {
  const labStats = [
    { label: 'Pending Tests', value: '24', color: 'text-blue-600' },
    { label: 'Fulfilment Rate', value: '98.2%', color: 'text-emerald-600' },
    { label: 'Avg. Turnaround', value: '4.2h', color: 'text-purple-600' },
    { label: 'Quality Alerts', value: '02', color: 'text-rose-600' },
  ];

  const labRequests = [
    { id: 'LAB-901', item: 'PCR Test Kits', batch: 'B-2024-X1', status: 'In Progress', priority: 'High' },
    { id: 'LAB-902', item: 'Viral Transport Media', batch: 'B-2024-Y2', status: 'Completed', priority: 'Medium' },
    { id: 'LAB-903', item: 'Antigen Rapid Tests', batch: 'B-2024-Z3', status: 'Pending', priority: 'Critical' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {labStats.map((stat, i) => (
          <div key={i} className="neu-flat p-4">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="neu-flat overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black text-gray-800">Lab Item Requests</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Quality Control & Fulfillment</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
            New Lab Request
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Request ID</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Item / Batch</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Priority</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {labRequests.map((req) => (
                <tr key={req.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-5 font-black text-gray-800">{req.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-700">{req.item}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{req.batch}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${req.priority === 'Critical' ? 'text-rose-600' : 'text-gray-400'}`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${req.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{req.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function OSLOperations({ orders, onUpdateStatus, onOrderClick }: OSLOperationsProps) {
  const [activeSubTab, setActiveSubTab] = useState<'ops' | 'review' | 'lab'>('ops');
  const [selectedSourcingOrder, setSelectedSourcingOrder] = useState<Order | null>(null);

  const submittedOrders = orders.filter(o => o.status === 'submitted');
  const coordinatingOrders = orders.filter(o => o.status === 'under_coordination');
  const optionsPreparedOrders = orders.filter(o => o.status === 'options_prepared');
  const acceptedOrders = orders.filter(o => o.status === 'country_option_accepted');
  const reservedOrders = orders.filter(o => o.status === 'stock_reserved');

  return (
    <div className="space-y-8">
      {/* Sub-Navigation */}
      <div className="flex gap-4 p-1 bg-gray-100/50 rounded-2xl w-fit neu-flat">
        {[
          { id: 'ops', label: 'Operations', icon: ShieldAlert },
          { id: 'review', label: 'Review Queue', icon: Layers },
          { id: 'lab', label: 'Laboratory', icon: Beaker },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeSubTab === tab.id 
                ? 'bg-white shadow-md text-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'ops' && (
          <motion.div
            key="ops"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Operations Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Pending Review', value: submittedOrders.length, color: 'text-orange-600', bg: 'bg-orange-50' },
                { label: 'AI Coordinating', value: coordinatingOrders.length, color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'Options Ready', value: optionsPreparedOrders.length, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Accepted', value: acceptedOrders.length, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Stock Reserved', value: reservedOrders.length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map((stat, i) => (
                <div key={i} className={`p-4 rounded-2xl border border-white/50 shadow-sm ${stat.bg}`}>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="neu-flat overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                    <div>
                      <h3 className="text-xl font-black text-gray-800">Operations Queue</h3>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Mission-Critical Validation</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-white shadow-sm border border-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition-all">
                        <ArrowUpDown size={16} />
                      </button>
                      <button className="p-2 bg-white shadow-sm border border-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition-all">
                        <Filter size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50">
                          <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Ref / Priority</th>
                          <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Requester Entity</th>
                          <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Status</th>
                          <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Action Control</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {[...coordinatingOrders, ...optionsPreparedOrders, ...acceptedOrders, ...reservedOrders].length > 0 ? [...coordinatingOrders, ...optionsPreparedOrders, ...acceptedOrders, ...reservedOrders].map((order) => (
                          <tr key={order.id} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="px-6 py-5">
                              <div className="flex flex-col">
                                <span className="font-black text-gray-800">{order.ref}</span>
                                <span className="text-[9px] font-black text-orange-500 uppercase">High Priority</span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex flex-col">
                                <span className="font-bold text-gray-700">{order.name}</span>
                                <span className="text-[10px] text-gray-400 font-medium">{order.initiator}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  order.status === 'under_coordination' ? 'bg-purple-500 animate-pulse' : 
                                  order.status === 'options_prepared' ? 'bg-blue-500' : 
                                  order.status === 'country_option_accepted' ? 'bg-indigo-500' :
                                  'bg-emerald-500'
                                }`} />
                                <span className="font-bold text-gray-700 uppercase text-[10px] tracking-widest">{order.status.replace(/_/g, ' ')}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              {order.status === 'under_coordination' && (
                                <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
                                  <Cpu size={14} className="animate-spin" />
                                  AI Processing...
                                </div>
                              )}
                              {order.status === 'options_prepared' && (
                                <button 
                                  onClick={() => setSelectedSourcingOrder(order)}
                                  className="px-6 py-2 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all"
                                >
                                  Review Options
                                </button>
                              )}
                              {order.status === 'country_option_accepted' && (
                                <button 
                                  onClick={() => onUpdateStatus(order.id, 'stock_reserved')}
                                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all"
                                >
                                  Approve (Reserve)
                                </button>
                              )}
                              {order.status === 'stock_reserved' && (
                                <button 
                                  onClick={() => onUpdateStatus(order.id, 'stock_released')}
                                  className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-100 hover:shadow-emerald-200 transition-all"
                                >
                                  Release Stock
                                </button>
                              )}
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={4} className="px-6 py-20 text-center">
                              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 size={32} className="text-gray-200" />
                              </div>
                              <p className="text-gray-400 font-black uppercase tracking-widest text-sm italic">Queue Clear</p>
                              <p className="text-gray-300 text-xs font-medium mt-1">All operational requests are processed.</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

               <div className="space-y-6">
                <div className="p-6 bg-blue-50 rounded-[28px] border border-blue-100 text-blue-800">
                  <div className="flex gap-4">
                    <AlertCircle size={24} className="shrink-0 text-blue-600" />
                    <div>
                      <h4 className="font-black text-sm mb-1 uppercase tracking-wider">Operational Protocol</h4>
                      <p className="text-xs font-medium leading-relaxed opacity-80">
                        Stock release is an irreversible action. Ensure all PTEAO codes and consignee data are validated before triggering the release rail.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Release Rail Visualizer */}
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-[32px] p-12 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
                  <Package size={40} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-400 uppercase tracking-widest mb-2">Release Rail Visualizer</h3>
                <p className="text-gray-400 text-sm font-medium max-w-md mx-auto">
                  Real-time visualization of material movement from hub to destination will be active upon first release.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'review' && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ReviewView 
              orders={orders} 
              onApprove={(id) => onUpdateStatus(id, 'under_coordination')} 
              onReject={(id) => onUpdateStatus(id, 'flagged')} 
              onSelectOrder={(id) => onOrderClick?.(id)} 
            />
          </motion.div>
        )}

        {activeSubTab === 'lab' && (
          <motion.div
            key="lab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <LaboratorySection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sourcing Options Modal */}
      <AnimatePresence>
        {selectedSourcingOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[40px] shadow-2xl p-8 w-full max-w-4xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 bg-blue-50 rounded-full -mr-12 -mt-12 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">AI Sourcing Options</h3>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Reference: {selectedSourcingOrder.ref}</p>
                  </div>
                  <button onClick={() => setSelectedSourcingOrder(null)} className="p-2 hover:bg-gray-100 rounded-full">
                    <XCircle size={24} className="text-gray-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Option 1: Full Hub Release */}
                  <div className="neu-flat p-6 border-2 border-blue-200 bg-blue-50/30">
                    <div className="flex justify-between items-start mb-4">
                      <div className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Option A: Hub Release</div>
                      <div className="text-xs font-black text-blue-600">ETA: 48h</div>
                    </div>
                    <h4 className="text-lg font-black text-gray-800 mb-2">Dubai Regional Hub</h4>
                    <p className="text-xs text-gray-500 font-medium mb-4 leading-relaxed">
                      Full fulfillment from Dubai Hub. FEFO compliant. Direct air freight to destination.
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-gray-400">Inventory Match:</span>
                        <span className="text-emerald-600">100%</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-gray-400">Est. Freight:</span>
                        <span className="text-gray-700">$1,250</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        onUpdateStatus(selectedSourcingOrder.id, 'awaiting_country_decision');
                        setSelectedSourcingOrder(null);
                      }}
                      className="w-full py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100"
                    >
                      Send to Country
                    </button>
                  </div>

                  {/* Option 2: Split Sourcing */}
                  <div className="neu-flat p-6 border-2 border-transparent hover:border-purple-200 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="px-3 py-1 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Option B: Split Sourcing</div>
                      <div className="text-xs font-black text-purple-600">ETA: 72h</div>
                    </div>
                    <h4 className="text-lg font-black text-gray-800 mb-2">Accra + Brindisi</h4>
                    <p className="text-xs text-gray-500 font-medium mb-4 leading-relaxed">
                      Partial release from Accra (60%) and Brindisi (40%). Optimizes for shelf-life longevity.
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-gray-400">Inventory Match:</span>
                        <span className="text-emerald-600">100%</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-gray-400">Est. Freight:</span>
                        <span className="text-gray-700">$1,890</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        onUpdateStatus(selectedSourcingOrder.id, 'awaiting_country_decision');
                        setSelectedSourcingOrder(null);
                      }}
                      className="w-full py-3 bg-white border border-gray-200 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50"
                    >
                      Send to Country
                    </button>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-2xl flex gap-3">
                  <Activity size={20} className="text-blue-600 shrink-0" />
                  <p className="text-[10px] font-bold text-gray-500 leading-relaxed italic">
                    AI Coordinator has optimized these options based on FEFO (First-Expiry-First-Out) and current global freight lane availability.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OSLOperations;
