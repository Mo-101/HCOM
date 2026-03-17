import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { warehouseAPI } from '../services/api';
import toast from 'react-hot-toast';
import Loading from './Loading';
import { 
  Package, 
  AlertTriangle, 
  Calendar, 
  ArrowUpRight, 
  MapPin, 
  Activity,
  ChevronRight,
  Search,
  Filter,
  PieChart as PieChartIcon,
  BarChart3,
  Globe,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Truck,
  Box,
  CheckCircle2
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { COUNTRY_STATUS_LABELS } from '../constants';

interface WarehouseManagementProps {
  orders?: Order[];
  onUpdateStatus?: (id: string, status: OrderStatus) => void;
}
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const statsData = [
  { name: 'Jan', orders: 400, value: 2400 },
  { name: 'Feb', orders: 300, value: 1398 },
  { name: 'Mar', orders: 200, value: 9800 },
  { name: 'Apr', orders: 278, value: 3908 },
  { name: 'May', orders: 189, value: 4800 },
  { name: 'Jun', orders: 239, value: 3800 },
];

const categoryData = [
  { name: 'Emergency Kits', value: 400, color: '#3b82f6' },
  { name: 'PPE', value: 300, color: '#10b981' },
  { name: 'Respiratory', value: 300, color: '#f59e0b' },
  { name: 'Sterile', value: 200, color: '#8b5cf6' },
];

const WarehouseManagement: React.FC<WarehouseManagementProps> = ({ orders = [], onUpdateStatus }) => {
  const [warehouses, setWarehouses] = useState<any[]>([
    { id: 'wh-1', name: 'Dakar Regional Hub', code: 'DKR-01', location: 'Dakar, Senegal', capacity: 85, stock: 1240, pending: 12, status: 'Operational' },
    { id: 'wh-2', name: 'Nairobi Global Hub', code: 'NBO-02', location: 'Nairobi, Kenya', capacity: 92, stock: 3150, pending: 24, status: 'Operational' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'expiry' | 'statistics' | 'releases'>('overview');

  const reservedOrders = orders.filter(o => o.status === 'stock_reserved');
  const releasedOrders = orders.filter(o => o.status === 'stock_released');
  const shippedOrders = orders.filter(o => o.status === 'shipped');

  const expiryAlerts = [
    { id: 1, item: 'Emergency Kit A', batch: 'B-9921', expiry: '2026-04-15', days: 28, status: 'Critical' },
    { id: 2, item: 'Surgical Masks', batch: 'B-9925', expiry: '2026-05-20', days: 63, status: 'Warning' },
    { id: 3, item: 'Sterile Gloves', batch: 'B-9928', expiry: '2026-06-10', days: 84, status: 'Stable' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Logistics & Warehouse Control</h2>
          <p className="text-sm text-gray-500 font-medium">Canonical Hubs: Dakar & Nairobi. Strategic stock management.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex p-1 bg-gray-100/50 rounded-2xl neu-flat">
            {[
              { id: 'overview', label: 'Hubs', icon: MapPin },
              { id: 'inventory', label: 'Inventory', icon: Package },
              { id: 'releases', label: 'Releases', icon: Truck },
              { id: 'expiry', label: 'Expiry', icon: Calendar },
              { id: 'statistics', label: 'Statistics', icon: BarChart3 },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white shadow-md text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Stock Value', val: '$12.4M', icon: <Activity />, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Low Stock Alerts', val: '14 Items', icon: <AlertTriangle />, color: 'text-orange-600', bg: 'bg-orange-50' },
                { label: 'Expiring Soon', val: '08 Batches', icon: <Calendar />, color: 'text-rose-600', bg: 'bg-rose-50' },
                { label: 'Active Hubs', val: '02 Canonical', icon: <MapPin />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map((stat, i) => (
                <div key={i} className="neu-flat p-5 flex items-center gap-4">
                  <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{stat.label}</div>
                    <div className="text-xl font-black text-gray-800 tracking-tight">{stat.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Warehouse Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {warehouses.map((wh) => (
                <motion.div 
                  key={wh.id}
                  whileHover={{ y: -5 }}
                  className="neu-flat p-6 space-y-6 group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">{wh.code}</div>
                        <h4 className="text-lg font-black text-gray-800 tracking-tight">{wh.name}</h4>
                        <p className="text-xs text-gray-400 font-bold">{wh.location}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {wh.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Capacity</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${wh.capacity}%` }} />
                        </div>
                        <span className="text-xs font-black text-gray-700">{wh.capacity}%</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Stock Items</div>
                      <div className="text-sm font-black text-gray-800">{wh.stock} Units</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pending</div>
                      <div className="text-sm font-black text-gray-800">{wh.pending} Orders</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                      <Activity size={14} />
                      Analytics
                    </button>
                    <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                      Manage Stock
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'inventory' && (
          <motion.div
            key="inventory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="neu-flat overflow-hidden"
          >
            <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search inventory items..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 flex items-center justify-center gap-2">
                  <Filter size={16} />
                  Filter
                </button>
                <button className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600">
                  Export CSV
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/30">
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Item Name</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Category</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Quantity</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Location</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Status</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'Emergency Kit A', cat: 'Kits', qty: '450', loc: 'Dakar Hub', status: 'In Stock', color: 'text-emerald-600' },
                    { name: 'Surgical Masks', cat: 'PPE', qty: '12,000', loc: 'Nairobi Hub', status: 'Low Stock', color: 'text-orange-600' },
                    { name: 'Sterile Gloves', cat: 'PPE', qty: '8,500', loc: 'Dakar Hub', status: 'In Stock', color: 'text-emerald-600' },
                    { name: 'Oxygen Concentrator', cat: 'Biomedical', qty: '45', loc: 'Nairobi Hub', status: 'Critical', color: 'text-rose-600' },
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-black text-gray-800 text-sm">{item.name}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">SKU: {1000 + i}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-500">{item.cat}</td>
                      <td className="px-6 py-4 text-sm font-black text-gray-800">{item.qty}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-600">{item.loc}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 neu-circle w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'expiry' && (
          <motion.div
            key="expiry"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2 neu-flat p-6 space-y-6">
              <h3 className="text-lg font-black text-gray-800 tracking-tight">Upcoming Expirations</h3>
              <div className="space-y-4">
                {expiryAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        alert.status === 'Critical' ? 'bg-rose-100 text-rose-600' : 
                        alert.status === 'Warning' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-800">{alert.item}</h4>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Batch: {alert.batch}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-black ${
                        alert.status === 'Critical' ? 'text-rose-600' : 
                        alert.status === 'Warning' ? 'text-orange-600' : 'text-blue-600'
                      }`}>
                        Exp: {alert.expiry}
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{alert.days} Days Left</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="neu-flat p-6 bg-gradient-to-br from-rose-500 to-rose-600 text-white space-y-4">
                <AlertTriangle size={32} className="text-rose-200" />
                <h4 className="text-xl font-black tracking-tight">Critical Expiry Alert</h4>
                <p className="text-sm text-rose-100 font-medium leading-relaxed">
                  Batch B-9921 (Emergency Kit A) is expiring in 28 days. Immediate redistribution or disposal protocol required.
                </p>
                <button className="w-full py-3 bg-white text-rose-600 rounded-xl font-black text-sm hover:bg-rose-50 transition-colors shadow-lg">
                  Initiate Protocol
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'releases' && (
          <motion.div
            key="releases"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Reserved', value: reservedOrders.length, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Released', value: releasedOrders.length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'In Transit', value: shippedOrders.length, color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((stat, i) => (
                <div key={i} className={`p-4 rounded-2xl border border-white/50 shadow-sm ${stat.bg}`}>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="neu-flat overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                <div>
                  <h3 className="text-xl font-black text-gray-800">Warehouse Release Queue</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Physical Fulfillment Rail</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Order Ref</th>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Destination</th>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Status</th>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[...reservedOrders, ...releasedOrders, ...shippedOrders].length > 0 ? [...reservedOrders, ...releasedOrders, ...shippedOrders].map((order) => (
                      <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="font-black text-gray-800">{order.ref}</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.date}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-700">{order.address}</span>
                            <span className="text-[10px] text-gray-400 font-medium uppercase">{order.shipmentMode}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              order.status === 'stock_reserved' ? 'bg-blue-500' :
                              order.status === 'stock_released' ? 'bg-emerald-500' : 'bg-purple-500'
                            }`} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                              {COUNTRY_STATUS_LABELS[order.status]}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          {order.status === 'stock_reserved' && (
                            <button 
                              onClick={() => onUpdateStatus?.(order.id, 'stock_released')}
                              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-100"
                            >
                              Confirm Pick & Pack
                            </button>
                          )}
                          {order.status === 'stock_released' && (
                            <button 
                              onClick={() => onUpdateStatus?.(order.id, 'shipped')}
                              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-100 flex items-center gap-2"
                            >
                              <Truck size={14} />
                              Dispatch
                            </button>
                          )}
                          {order.status === 'shipped' && (
                            <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
                              <Box size={14} />
                              In Transit
                            </div>
                          )}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-20 text-center">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} className="text-gray-200" />
                          </div>
                          <p className="text-gray-400 font-black uppercase tracking-widest text-sm italic">Release Queue Clear</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'statistics' && (
          <motion.div
            key="statistics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Volume', val: '12,450', trend: '+12.4%', up: true, icon: <Package />, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Total Value', val: '$4.2M', trend: '+8.2%', up: true, icon: <DollarSign />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Global Reach', val: '142 Countries', trend: '+4', up: true, icon: <Globe />, color: 'text-violet-600', bg: 'bg-violet-50' },
                { label: 'Efficiency', val: '94.2%', trend: '-1.2%', up: false, icon: <TrendingUp />, color: 'text-orange-600', bg: 'bg-orange-50' },
              ].map((stat, i) => (
                <div key={i} className="neu-flat p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{stat.label}</div>
                      <div className="text-xl font-black text-gray-800 tracking-tight">{stat.val}</div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                    {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {stat.trend}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Volume Chart */}
              <div className="neu-flat p-6">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-black text-gray-800 tracking-tight">Order Volume Trends</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Units</span>
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={statsData}>
                      <defs>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Distribution Chart */}
              <div className="neu-flat p-6">
                <h3 className="text-lg font-black text-gray-800 tracking-tight mb-8">Category Distribution</h3>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={8}
                        dataKey="value"
                        stroke="none"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3 pr-8">
                    {categoryData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-xs font-bold text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-xs font-black text-gray-800">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WarehouseManagement;
