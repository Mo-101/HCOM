import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Beaker, Activity, AlertCircle, CheckCircle2, Clock, Search, Filter } from 'lucide-react';
import Loading from './Loading';

const LabStatCard = ({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) => (
  <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex items-center gap-4">
    <div className={`p-3 rounded-2xl ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</div>
      <div className="text-xl font-black text-gray-800">{value}</div>
    </div>
  </div>
);

function LaboratoryView() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  const tests = [
    { id: 'LAB-2026-001', sample: 'IEHK Basic Unit', type: 'Quality Control', status: 'In Progress', priority: 'High', date: '2026-03-15' },
    { id: 'LAB-2026-002', sample: 'N95 Masks', type: 'Material Integrity', status: 'Completed', priority: 'Medium', date: '2026-03-14' },
    { id: 'LAB-2026-003', sample: 'Nitrile Gloves', type: 'Sterility Test', status: 'Pending', priority: 'Low', date: '2026-03-15' },
    { id: 'LAB-2026-004', sample: 'Diagnostic Kits', type: 'Sensitivity Analysis', status: 'Completed', priority: 'High', date: '2026-03-13' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
        <div>
          <h2 className="text-2xl font-black text-gray-800">Laboratory Control</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Quality Assurance & Testing Dashboard</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2">
            <FlaskConical size={16} />
            New Test Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LabStatCard label="Active Tests" value="12" icon={Activity} color="bg-blue-500" />
        <LabStatCard label="Pending Review" value="05" icon={Clock} color="bg-orange-500" />
        <LabStatCard label="Completed (24h)" value="28" icon={CheckCircle2} color="bg-emerald-500" />
        <LabStatCard label="Alerts" value="02" icon={AlertCircle} color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-black text-gray-800">Recent Test Queue</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search tests..." 
                  className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/30">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Test ID</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Sample</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Type</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tests.map((test) => (
                  <tr key={test.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-sm text-blue-600">{test.id}</td>
                    <td className="px-6 py-4 font-bold text-sm text-gray-800">{test.sample}</td>
                    <td className="px-6 py-4 font-bold text-xs text-gray-500">{test.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        test.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                        test.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {test.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold ${
                        test.priority === 'High' ? 'text-rose-500' :
                        test.priority === 'Medium' ? 'text-orange-500' :
                        'text-gray-400'
                      }`}>
                        {test.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
            <h3 className="text-lg font-black text-gray-800 mb-6">Equipment Status</h3>
            <div className="space-y-4">
              {[
                { name: 'Spectrometer A1', status: 'Operational', health: 98 },
                { name: 'Centrifuge C4', status: 'Maintenance', health: 45 },
                { name: 'Incubator I2', status: 'Operational', health: 92 },
                { name: 'Microscope M1', status: 'Operational', health: 100 },
              ].map((eq, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-black text-gray-700">{eq.name}</span>
                    <span className={`text-[10px] font-black uppercase ${eq.status === 'Operational' ? 'text-emerald-500' : 'text-orange-500'}`}>
                      {eq.status}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${eq.health > 80 ? 'bg-emerald-500' : eq.health > 50 ? 'bg-orange-500' : 'bg-rose-500'}`}
                      style={{ width: `${eq.health}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl shadow-xl shadow-blue-100 text-white">
            <Beaker size={32} className="mb-4 opacity-50" />
            <h4 className="text-lg font-black mb-2">Lab Compliance</h4>
            <p className="text-xs font-bold text-white/70 leading-relaxed mb-4">
              All active tests are currently compliant with WHO Laboratory Quality Management System (LQMS) standards.
            </p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-black uppercase tracking-widest transition-colors">
              View Compliance Report
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LaboratoryView;
