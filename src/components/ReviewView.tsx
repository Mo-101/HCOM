import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ArrowUpDown, CheckCircle2, AlertCircle, Clock, FileText, User, MapPin, DollarSign } from 'lucide-react';
import { Order } from '../types';

interface ReviewViewProps {
  orders: Order[];
  onSelectOrder: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const ReviewView: React.FC<ReviewViewProps> = ({ orders, onSelectOrder, onApprove, onReject }) => {
  const pendingReviews = orders.filter(o => o.status === 'submitted');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800">Operational Review</h2>
          <p className="text-gray-500 font-medium">Critical validation queue for pending order requests. Approving triggers AI Coordination.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white shadow-[6px_6px_12px_#e6e9ef,-6px_-6px_12px_#ffffff] px-6 py-3 rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            <span className="text-sm font-black text-gray-700">{pendingReviews.length} Pending Actions</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white shadow-[8px_8px_16px_#e6e9ef,-8px_-8px_16px_#ffffff] p-4 rounded-[24px] border border-white/20 flex flex-col md:flex-row gap-4 items-center">
        <div className="bg-white shadow-[inset_4px_4px_8px_#e6e9ef,inset_-4px_-4px_8px_#ffffff] flex items-center gap-3 px-4 py-3 rounded-xl flex-1 w-full">
          <Search className="text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by Ref, Country, or Requester..." 
            className="bg-transparent border-none outline-none text-sm text-gray-700 w-full"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="bg-white shadow-[6px_6px_12px_#e6e9ef,-6px_-6px_12px_#ffffff] px-5 py-3 text-sm font-bold text-gray-600 flex items-center gap-2 rounded-xl hover:shadow-md transition-all">
            <Filter size={16} />
            Priority
          </button>
          <button className="bg-white shadow-[6px_6px_12px_#e6e9ef,-6px_-6px_12px_#ffffff] px-5 py-3 text-sm font-bold text-gray-600 flex items-center gap-2 rounded-xl hover:shadow-md transition-all">
            <ArrowUpDown size={16} />
            Value
          </button>
        </div>
      </div>

      {/* Review Queue */}
      <div className="grid grid-cols-1 gap-4">
        {pendingReviews.length > 0 ? pendingReviews.map((order) => (
          <motion.div 
            key={order.id}
            whileHover={{ x: 10 }}
            onClick={() => onSelectOrder(order.id)}
            className="bg-white rounded-[24px] shadow-[8px_8px_16px_#e6e9ef,-8px_-8px_16px_#ffffff] border border-white/50 p-6 cursor-pointer group transition-all"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr_1fr_auto] gap-6 items-center">
              <div className="space-y-1">
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Reference</div>
                <div className="text-lg font-black text-gray-800">{order.ref}</div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                  <Clock size={10} />
                  SUBMITTED {order.date}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Requester & Purpose</div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <User size={14} className="text-blue-500" />
                  {order.name}
                </div>
                <div className="text-xs text-gray-500 line-clamp-1 italic">"{order.purpose}"</div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Destination</div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <MapPin size={14} className="text-red-500" />
                  {order.address}
                </div>
                <div className="text-[10px] text-gray-400 font-bold uppercase">{order.shipmentMode}</div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Value & Items</div>
                <div className="flex items-center gap-2 text-sm font-black text-blue-600">
                  <DollarSign size={14} />
                  {order.value.toLocaleString()}
                </div>
                <div className="text-[10px] text-gray-500 font-bold">{order.items.length} Line Items</div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); onApprove?.(order.id); }}
                  className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                >
                  <CheckCircle2 size={20} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onReject?.(order.id); }}
                  className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                >
                  <AlertCircle size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-[32px] p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-400 italic">Review Queue Empty</h3>
            <p className="text-gray-400 text-sm mt-2">All submitted orders have been processed.</p>
          </div>
        )}
      </div>

      {/* Review Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-600 rounded-[32px] p-8 text-white">
          <h3 className="text-xl font-black mb-4">Review Protocol</h3>
          <ul className="space-y-4">
            {[
              "Verify PTEAO budget codes match country allocation.",
              "Validate shipment mode against urgency and weight.",
              "Check for duplicate requests in the last 24 hours.",
              "Ensure all high-value items have proper justification."
            ].map((rule, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-medium">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-black">{i + 1}</span>
                </div>
                {rule}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-[12px_12px_24px_#e6e9ef,-12px_-12px_24px_#ffffff] border border-white/50 rounded-[32px] p-8">
          <h3 className="text-xl font-black text-gray-800 mb-4">Exception Handling</h3>
          <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
            If a request is flagged, OSL will raise a specific exception. The requester 
            must address the exception before the order can proceed to release.
          </p>
          <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
            <AlertCircle size={20} className="text-orange-500 shrink-0 mt-0.5" />
            <p className="text-xs text-orange-700 font-bold leading-relaxed">
              Targeted exceptions prevent full request returns, maintaining workflow momentum.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewView;
