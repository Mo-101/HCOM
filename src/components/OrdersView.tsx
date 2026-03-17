import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ArrowUpDown, FileText, Clock, CheckCircle2, Truck, MoreVertical, Eye, Download, Printer, ChevronRight } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import OrderDetailView from './OrderDetailView';

interface OrdersViewProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
}

function OrdersView({ orders, onUpdateStatus, selectedOrderId, setSelectedOrderId }: OrdersViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = o.ref.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           o.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending', value: orders.filter(o => o.status === 'submitted').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Shipped', value: orders.filter(o => o.status === 'approved').length, icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Delivered', value: orders.filter(o => o.status === 'completed').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'submitted': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'approved': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
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
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white shadow-[8px_8px_16px_#e6e9ef,-8px_-8px_16px_#ffffff] p-6 rounded-[24px] border border-white/20 flex items-center gap-4">
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
      <div className="bg-white shadow-[12px_12px_24px_#e6e9ef,-12px_-12px_24px_#ffffff] rounded-[32px] border border-white/20 overflow-hidden">
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
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">Date</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">Items</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">Value</th>
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
                    <span className="text-sm font-bold text-gray-600">{order.date}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-black text-gray-600">{order.items.length}</span>
                      <span className="text-xs font-bold text-gray-500">Lines</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-blue-600">${order.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedOrderId(order.id)}
                        className="p-2 bg-white shadow-[2px_2px_4px_#e6e9ef,-2px_-2px_4px_#ffffff] rounded-lg text-gray-400 hover:text-blue-600 hover:shadow-md transition-all"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="p-2 bg-white shadow-[2px_2px_4px_#e6e9ef,-2px_-2px_4px_#ffffff] rounded-lg text-gray-400 hover:text-blue-600 hover:shadow-md transition-all">
                        <Download size={16} />
                      </button>
                      <button className="p-2 bg-white shadow-[2px_2px_4px_#e6e9ef,-2px_-2px_4px_#ffffff] rounded-lg text-gray-400 hover:text-gray-600 hover:shadow-md transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <div className="text-xs font-bold text-gray-400">
            Showing <span className="text-gray-700">{filteredOrders.length}</span> of <span className="text-gray-700">{orders.length}</span> orders
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white shadow-[2px_2px_4px_#e6e9ef,-2px_-2px_4px_#ffffff] rounded-xl text-xs font-bold text-gray-400 cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 bg-blue-600 text-white shadow-lg shadow-blue-100 rounded-xl text-xs font-bold">1</button>
            <button className="px-4 py-2 bg-white shadow-[2px_2px_4px_#e6e9ef,-2px_-2px_4px_#ffffff] rounded-xl text-xs font-bold text-gray-600 hover:text-blue-600 transition-all">2</button>
            <button className="px-4 py-2 bg-white shadow-[2px_2px_4px_#e6e9ef,-2px_-2px_4px_#ffffff] rounded-xl text-xs font-bold text-gray-600 hover:text-blue-600 transition-all">Next</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default OrdersView;
