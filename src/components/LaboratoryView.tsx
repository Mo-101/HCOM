import React from 'react';
import { motion } from 'motion/react';
import { Beaker, CheckCircle2, AlertCircle, Microscope } from 'lucide-react';

const LaboratoryView: React.FC = () => {
  const tests = [
    { id: 'LAB-001', item: 'Emergency Kit A', status: 'Passed', date: '12 Mar 2026', batch: 'B-9921' },
    { id: 'LAB-002', item: 'Surgical Masks', status: 'In Progress', date: '14 Mar 2026', batch: 'B-9925' },
    { id: 'LAB-003', item: 'Sterile Gloves', status: 'Pending', date: '15 Mar 2026', batch: 'B-9928' },
    { id: 'LAB-004', item: 'Ventilator Kit', status: 'Flagged', date: '16 Mar 2026', batch: 'B-9930' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Quality Control Lab</h2>
          <p className="text-sm text-gray-500">Batch testing and quality assurance monitoring.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100">
            + New Test Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold">Recent Lab Tests</h3>
              <Microscope size={20} className="text-blue-600" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/30">
                    <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Test ID</th>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Item / Batch</th>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Date</th>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tests.map((test) => (
                    <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-blue-600">{test.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold">{test.item}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">{test.batch}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-500">{test.date}</td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-2 font-bold text-xs ${
                          test.status === 'Passed' ? 'text-emerald-600' : 
                          test.status === 'In Progress' ? 'text-blue-600' : 
                          test.status === 'Flagged' ? 'text-rose-600' : 'text-gray-400'
                        }`}>
                          {test.status === 'Passed' && <CheckCircle2 size={14} />}
                          {test.status === 'Flagged' && <AlertCircle size={14} />}
                          {test.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold">Lab Capacity</h3>
            <div className="space-y-4">
              {[
                { label: 'Sterility Testing', val: 85, color: 'bg-emerald-500' },
                { label: 'Chemical Analysis', val: 42, color: 'bg-blue-500' },
                { label: 'Packaging Integrity', val: 68, color: 'bg-blue-400' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{item.label}</span>
                    <span>{item.val}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl shadow-lg text-white space-y-4">
            <div className="p-3 bg-white/20 rounded-xl w-fit">
              <Beaker size={24} />
            </div>
            <h4 className="text-lg font-bold">Compliance Alert</h4>
            <p className="text-sm text-blue-100 leading-relaxed">
              Batch B-9930 has been flagged for further review. Please check the detailed report in the Laboratory Team portal.
            </p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
              View Flagged Batch
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LaboratoryView;
