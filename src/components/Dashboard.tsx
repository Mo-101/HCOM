import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const KpiCard = ({ label, value, trend, trendUp, sparkline }: { 
  label: string, 
  value: string, 
  trend: string, 
  trendUp?: boolean,
  sparkline: number[]
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">{label}</div>
    <div className="text-2xl font-black mb-2">{value}</div>
    <div className="flex items-center gap-2 mb-4">
      <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${trendUp ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
        {trend}
      </div>
    </div>
    <div className="h-8 flex items-end gap-1">
      {sparkline.map((v, i) => (
        <div 
          key={i} 
          className={`flex-1 rounded-t-sm ${trendUp ? 'bg-emerald-400/30' : 'bg-orange-400/30'}`} 
          style={{ height: `${v}%` }} 
        />
      ))}
    </div>
  </div>
);

function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard label="Orders Processed" value="2,634" trend="8.4% vs last week" trendUp sparkline={[35, 58, 46, 74, 92, 84]} />
        <KpiCard label="Active Lines" value="12" trend="2 lines online" trendUp sparkline={[26, 32, 50, 63, 70, 76]} />
        <KpiCard label="Shipping On-Time" value="94.2%" trend="1.9% improvement" trendUp sparkline={[50, 62, 59, 68, 78, 88]} />
        <KpiCard label="Maintenance Alerts" value="07" trend="2 require review" sparkline={[18, 24, 29, 46, 57, 61]} />
        <KpiCard label="Capacity" value="61%" trend="4.1% utilization" trendUp sparkline={[38, 41, 45, 52, 64, 72]} />
        <KpiCard label="Low Stock SKUs" value="23" trend="5 urgent shortages" sparkline={[78, 70, 65, 55, 46, 40]} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Hourly Throughput</h3>
            <span className="text-sm text-gray-500 font-semibold">Units processed</span>
          </div>
          <div className="h-[250px] flex items-end gap-3 pt-2">
            {[38, 52, 44, 57, 76, 95, 80, 42, 81, 83, 82, 84].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 h-full">
                <div className="w-full max-w-[38px] h-full flex items-end justify-center">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className={`w-full rounded-t-xl rounded-b-md ${i === 5 ? 'bg-gradient-to-t from-blue-600 to-blue-400' : 'bg-gradient-to-t from-blue-200 to-blue-100'}`}
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-bold">{(i * 2).toString().padStart(2, '0')}:00</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Regional Output</h3>
            <span className="text-sm text-gray-500 font-semibold">Live allocation</span>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-48 h-48 rounded-full border-[20px] border-blue-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-extrabold">84%</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Uptime</div>
              </div>
              <svg className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] -rotate-90">
                <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#0f5bff" strokeWidth="20" strokeDasharray="300" strokeDashoffset="60" strokeLinecap="round" />
              </svg>
            </div>
            <div className="w-full space-y-3">
              {[
                { label: 'North Hub', val: '42%', color: 'bg-blue-600' },
                { label: 'East Hub', val: '27%', color: 'bg-blue-400' },
                { label: 'South Hub', val: '19%', color: 'bg-blue-200' },
                { label: 'Overflow', val: '12%', color: 'bg-blue-50' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    {item.label}
                  </div>
                  <span>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold">Live Work Orders</h3>
          <span className="text-sm text-gray-500 font-semibold">Detailed admin layer</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Order ID</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Name</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Date</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Value</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Status</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { id: '#2632', name: 'Brooklyn Zoe', date: '31 Jul 2026', val: '$64.00', status: 'Pending', color: 'bg-orange-400' },
                { id: '#2633', name: 'John McCormick', date: '01 Aug 2026', val: '$35.00', status: 'Dispatch', color: 'bg-emerald-400', active: true },
                { id: '#2634', name: 'Sandra Pugh', date: '02 Aug 2026', val: '$74.00', status: 'Completed', color: 'bg-gray-400' },
                { id: '#2635', name: 'Verrie Herr', date: '02 Aug 2026', val: '$82.00', status: 'Pending', color: 'bg-orange-400' }
              ].map((row, i) => (
                <tr key={i} className={`transition-colors ${row.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4 font-bold">{row.id}</td>
                  <td className="px-6 py-4 font-bold">{row.name}</td>
                  <td className="px-6 py-4 font-bold">{row.date}</td>
                  <td className="px-6 py-4 font-bold">{row.val}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <div className={`w-2 h-2 rounded-full ${row.color}`} />
                      {row.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className={`p-2 rounded-lg ${row.active ? 'bg-white/20' : 'bg-gray-100'}`}>
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
