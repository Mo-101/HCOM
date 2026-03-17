import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Truck, 
  MoreVertical, 
  Eye, 
  Download, 
  Printer, 
  ChevronRight,
  Zap,
  Activity,
  MapPin,
  AlertCircle,
  BrainCircuit,
  Check
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { COUNTRY_STATUS_LABELS } from '../constants';
import OrderDetailView from './OrderDetailView';

interface OrdersViewProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  initialFilter?: OrderStatus | 'all';
}

const LiveProgressViz = ({ order }: { order: Order }) => {
  const steps = [
    { label: 'Draft', status: 'completed', icon: FileText },
    { label: 'Submitted', status: order.status !== 'draft' ? 'completed' : 'pending', icon: Clock },
    { label: 'Coordinated', status: !['draft', 'submitted', 'under_coordination'].includes(order.status) ? 'completed' : 'pending', icon: BrainCircuit },
    { label: 'Reserved', status: ['stock_reserved', 'stock_released', 'shipped', 'completed'].includes(order.status) ? 'completed' : 'pending', icon: CheckCircle2 },
    { label: 'Delivered', status: order.status === 'completed' ? 'completed' : 'pending', icon: MapPin },
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto py-8">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
              step.status === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              <step.icon size={20} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${
              step.status === 'completed' ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-gray-100 mx-2 relative -mt-6">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: step.status === 'completed' ? '100%' : '0%' }}
                className="h-full bg-blue-600"
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

function OrdersView({ orders, onUpdateStatus, selectedOrderId, setSelectedOrderId, initialFilter = 'all' }: OrdersViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>(initialFilter);
  const [showLiveViz, setShowLiveViz] = useState<string | null>(null);
  const [selectedDecisionOrder, setSelectedDecisionOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = o.ref.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           o.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const decisionRequiredOrders = orders.filter(o => o.status === 'awaiting_country_decision');

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'AI Triaged', value: orders.filter(o => o.status === 'submitted').length, icon: BrainCircuit, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'In Transit', value: orders.filter(o => o.status === 'shipped').length, icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'submitted': 
      case 'under_coordination':
      case 'options_prepared':
      case 'awaiting_country_decision':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'country_option_accepted':
      case 'stock_reserved':
      case 'stock_released':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'shipped':
      case 'completed': 
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'flagged':
      case 'exception_raised':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  if (selectedOrderId) {
    const selectedOrder = orders.find(o => o.id === selectedOrderId);
    if (selectedOrder) {
      return (
        <OrderDetailView 
          order={selectedOrder} 
          onBack={() => setSelectedOrderId(null)} 
          onUpdateStatus={onUpdateStatus}
        />
      );
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Decision Required Alert */}
      {decisionRequiredOrders.length > 0 && (
        <div className="bg-blue-600 rounded-[32px] p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 bg-white/10 rounded-full -mr-12 -mt-12"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <Activity size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black">Decision Required</h3>
                <p className="text-sm text-white/80 font-medium">OSL has prepared sourcing options for {decisionRequiredOrders.length} order(s).</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedDecisionOrder(decisionRequiredOrders[0])}
              className="px-8 py-3 bg-white text-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg"
            >
              Review Options
            </button>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="neu-flat p-6 flex items-center gap-4">
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm`}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
              <div className="text-2xl font-black text-gray-800">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="neu-flat overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-sm">
          <div className="bg-white shadow-[inset_4px_4px_8px_#e6e9ef,inset_-4px_-4px_8px_#ffffff] flex items-center gap-3 px-4 py-3 rounded-xl flex-1 w-full md:w-auto">
            <Search className="text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by reference or requester..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-gray-700 w-full"
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
              {['all', 'draft', 'submitted', 'approved', 'completed'].map((status) => (
                <button 
                  key={status}
                  onClick={() => setStatusFilter(status as any)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    statusFilter === status 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <button className="bg-white shadow-[4px_4px_8px_#e6e9ef,-4px_-4px_8px_#ffffff] px-4 py-2 rounded-xl text-gray-600 hover:text-blue-600 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">Reference</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">Requester</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">Status</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-gray-800 text-sm">{order.ref}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ID: {order.id}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                        {order.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-700 text-sm">{order.name}</span>
                        <span className="text-[10px] text-gray-400 font-medium">{order.address}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                      {COUNTRY_STATUS_LABELS[order.status] || order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setShowLiveViz(order.id)}
                        className="p-2 bg-white shadow-[2px_2px_4px_#e6e9ef,-2px_-2px_4px_#ffffff] rounded-lg text-gray-400 hover:text-blue-600 hover:shadow-md transition-all"
                        title="Live Progress"
                      >
                        <Activity size={16} />
                      </button>
                      <button 
                        onClick={() => setSelectedOrderId(order.id)}
                        className="p-2 bg-white shadow-[2px_2px_4px_#e6e9ef,-2px_-2px_4px_#ffffff] rounded-lg text-gray-400 hover:text-blue-600 hover:shadow-md transition-all"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="p-2 bg-white shadow-[2px_2px_4px_#e6e9ef,-2px_-2px_4px_#ffffff] rounded-lg text-gray-400 hover:text-blue-600 hover:shadow-md transition-all">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Viz Modal */}
      <AnimatePresence>
        {showLiveViz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[40px] shadow-2xl p-8 w-full max-w-3xl relative"
            >
              <button 
                onClick={() => setShowLiveViz(null)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight size={24} className="rotate-90" />
              </button>
              
              <div className="mb-8">
                <h3 className="text-2xl font-black text-gray-800 tracking-tight">Real-time Order Visualization</h3>
                <p className="text-sm text-gray-500 font-medium">Tracking Reference: {orders.find(o => o.id === showLiveViz)?.ref}</p>
              </div>

              <LiveProgressViz order={orders.find(o => o.id === showLiveViz)!} />

              <div className="mt-8 p-6 bg-blue-50 rounded-3xl border border-blue-100 flex gap-4">
                <Zap size={24} className="text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-black text-blue-800 text-sm uppercase tracking-wider">Live Telemetry</h4>
                  <p className="text-xs text-blue-600/80 font-medium leading-relaxed">
                    System is monitoring global logistics nodes. Current estimated delivery window: 48-72 hours.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Country Decision Modal */}
      <AnimatePresence>
        {selectedDecisionOrder && (
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
                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">Accept Sourcing Option</h3>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Reference: {selectedDecisionOrder.ref}</p>
                  </div>
                  <button onClick={() => setSelectedDecisionOrder(null)} className="p-2 hover:bg-gray-100 rounded-full">
                    <AlertCircle size={24} className="text-gray-400" />
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
                    <button 
                      onClick={() => {
                        onUpdateStatus?.(selectedDecisionOrder.id, 'country_option_accepted');
                        setSelectedDecisionOrder(null);
                      }}
                      className="w-full py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                    >
                      <Check size={16} />
                      Accept Option A
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
                    <button 
                      onClick={() => {
                        onUpdateStatus?.(selectedDecisionOrder.id, 'country_option_accepted');
                        setSelectedDecisionOrder(null);
                      }}
                      className="w-full py-3 bg-white border border-gray-200 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                      <Check size={16} />
                      Accept Option B
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default OrdersView;
