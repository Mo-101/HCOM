import React from 'react';
import { motion } from 'motion/react';
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
import { Download, Filter, Calendar, TrendingUp, TrendingDown, Globe, DollarSign, Package } from 'lucide-react';

const data = [
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

const StatisticView: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Logistics Analytics Hub</h2>
          <p className="text-sm text-gray-500 font-medium">Comprehensive data visualization of global commodity flow.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Calendar size={16} />
            Last 30 Days
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center gap-2 transition-colors">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

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
              <AreaChart data={data}>
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

        {/* Financial Line Chart */}
        <div className="neu-flat p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-gray-800 tracking-tight">Financial Value (USD)</h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Revenue Flow</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
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

        {/* Regional Performance Table */}
        <div className="neu-flat p-6">
          <h3 className="text-lg font-black text-gray-800 tracking-tight mb-8">Regional Performance</h3>
          <div className="space-y-3">
            {[
              { region: 'Europe', orders: 1240, growth: '+12%', color: 'bg-blue-600' },
              { region: 'Africa', orders: 850, growth: '+24%', color: 'bg-emerald-500' },
              { region: 'Asia', orders: 2100, growth: '+8%', color: 'bg-violet-500' },
              { region: 'Americas', orders: 1560, growth: '-3%', color: 'bg-orange-500' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-1.5 h-8 ${item.color} rounded-full`} />
                  <div>
                    <div className="font-black text-gray-800 text-sm tracking-tight">{item.region}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.orders} Orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-black ${item.growth.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {item.growth}
                  </div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">vs prev. month</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatisticView;
