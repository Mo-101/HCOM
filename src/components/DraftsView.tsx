import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Trash2, Edit3, Send, Clock, AlertCircle } from 'lucide-react';

interface Order {
  id: string;
  ref: string;
  name: string;
  date: string;
  value: number;
  status: string;
}

interface DraftsViewProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: any) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

function DraftsView({ orders, onUpdateStatus, onDelete, onEdit }: DraftsViewProps) {
  const drafts = orders.filter(o => o.status === 'draft');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="neu-flat p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-800">Draft Orders</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Manage and finalize pending requests</p>
        </div>
        <div className="neu-pressed flex items-center gap-3 px-4 py-2 text-orange-600 font-bold text-xs">
          <Clock size={16} />
          {drafts.length} Active Drafts
        </div>
      </div>

      {drafts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drafts.map((draft) => (
            <motion.div 
              key={draft.id}
              whileHover={{ scale: 1.02 }}
              className="neu-flat overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    <ClipboardList size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reference</div>
                    <div className="text-sm font-black text-gray-800">{draft.ref}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-black text-gray-800 mb-1">{draft.name}</h3>
                <p className="text-xs font-bold text-gray-400 mb-4">Created on {draft.date}</p>
                
                <div className="neu-pressed flex justify-between items-center p-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Estimated Value</span>
                  <span className="text-lg font-black text-gray-800">${draft.value.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 grid grid-cols-3 gap-2">
                <button 
                  onClick={() => onEdit?.(draft.id)}
                  className="neu-btn flex flex-col items-center justify-center p-2 group"
                >
                  <Edit3 size={18} className="mb-1 group-hover:text-blue-600" />
                  <span className="text-[10px] font-black uppercase">Edit</span>
                </button>
                <button 
                  onClick={() => onDelete?.(draft.id)}
                  className="neu-btn flex flex-col items-center justify-center p-2 group"
                >
                  <Trash2 size={18} className="mb-1 group-hover:text-rose-600" />
                  <span className="text-[10px] font-black uppercase">Delete</span>
                </button>
                <button 
                  onClick={() => onUpdateStatus(draft.id, 'submitted')}
                  className="neu-btn-primary flex flex-col items-center justify-center p-2"
                >
                  <Send size={18} className="mb-1" />
                  <span className="text-[10px] font-black uppercase">Submit</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="neu-flat p-20 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ClipboardList size={40} className="text-gray-200" />
          </div>
          <h3 className="text-xl font-black text-gray-300 uppercase tracking-widest">No Drafts Found</h3>
          <p className="text-sm text-gray-400 font-bold mt-2 max-w-xs mx-auto">
            You don't have any pending draft orders. Start a new order from the catalog to see it here.
          </p>
        </div>
      )}

      <div className="neu-pressed p-5 text-blue-800 text-sm leading-relaxed flex gap-3">
        <AlertCircle size={20} className="shrink-0" />
        <p><strong>Note:</strong> Drafts are only visible to you. Once submitted, they enter the OSL review queue and can no longer be edited after the 1-hour adjustment window.</p>
      </div>
    </motion.div>
  );
}

export default DraftsView;
