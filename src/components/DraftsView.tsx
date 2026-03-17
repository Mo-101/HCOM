import React from 'react';
import { motion } from 'motion/react';
import { FileText, Trash2, Send, Clock } from 'lucide-react';
import { Order } from '../types';

interface DraftsViewProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: any) => void;
  onSelectOrder: (id: string) => void;
}

const DraftsView: React.FC<DraftsViewProps> = ({ orders, onUpdateStatus, onSelectOrder }) => {
  const drafts = orders.filter(o => o.status === 'draft');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Draft Orders</h2>
          <p className="text-sm text-gray-500">Manage your incomplete order requests.</p>
        </div>
        <div className="px-4 py-2 bg-orange-50 text-orange-600 rounded-xl border border-orange-100 font-bold text-sm flex items-center gap-2">
          <Clock size={16} /> {drafts.length} Drafts Pending
        </div>
      </div>

      {drafts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drafts.map((draft) => (
            <motion.div 
              key={draft.id}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                  <FileText size={24} />
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ref</div>
                  <div className="font-bold">{draft.ref}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg truncate">{draft.consignee || 'Unnamed Recipient'}</h4>
                <p className="text-xs text-gray-500 font-medium">Created on {draft.date}</p>
              </div>

              <div className="flex justify-between items-center py-3 border-y border-gray-50">
                <div className="text-sm font-bold text-gray-400">{draft.items.length} Items</div>
                <div className="text-lg font-black text-blue-600">${draft.value.toFixed(2)}</div>
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => onSelectOrder(draft.id)}
                  className="flex-1 py-2 bg-gray-50 text-gray-700 rounded-lg font-bold text-xs hover:bg-gray-100 transition-colors"
                >
                  Edit Draft
                </button>
                <button 
                  onClick={() => onUpdateStatus(draft.id, 'submitted')}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Submit Order"
                >
                  <Send size={16} />
                </button>
                <button 
                  className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                  title="Delete Draft"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-20 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
            <FileText size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-400">No Drafts Found</h3>
            <p className="text-gray-400">Your draft orders will appear here.</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DraftsView;
