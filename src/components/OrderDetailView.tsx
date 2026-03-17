import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Activity, ShoppingCart, Package, Users, FileText, LayoutDashboard, Settings, LogOut, Zap, Warehouse } from 'lucide-react';
import { Order, Product } from '../types';

interface OrderDetailViewProps {
  order: Order;
  onBack: () => void;
}

const OrderDetailView: React.FC<OrderDetailViewProps> = ({ order, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Workflow Timeline */}
      <section className="max-w-7xl mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          <div className="border border-gray-200 rounded-2xl p-4 bg-white relative pl-10">
            <div className="absolute left-4 top-5 w-3 h-3 rounded-full bg-emerald-500"></div>
            <h4 className="text-sm font-bold mb-1">Checkout completed</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Items transferred from product catalog into a draft order request.</p>
          </div>
          <div className="border border-gray-200 rounded-2xl p-4 bg-white relative pl-10">
            <div className="absolute left-4 top-5 w-3 h-3 rounded-full bg-blue-600"></div>
            <h4 className="text-sm font-bold mb-1">Requester adjustment window</h4>
            <p className="text-xs text-gray-500 leading-relaxed">1 hour window for edits, PTEAO, shipment data, and requester references.</p>
          </div>
          <div className="border border-gray-200 rounded-2xl p-4 bg-white relative pl-10">
            <div className="absolute left-4 top-5 w-3 h-3 rounded-full bg-gray-200"></div>
            <h4 className="text-sm font-bold mb-1">OSL Operations review</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Operations validates and routes approved requests to stock release.</p>
          </div>
          <div className="border border-gray-200 rounded-2xl p-4 bg-white relative pl-10">
            <div className="absolute left-4 top-5 w-3 h-3 rounded-full bg-gray-200"></div>
            <h4 className="text-sm font-bold mb-1">Stock release</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Warehouse release is generated after approval.</p>
          </div>
        </div>
      </section>

      {/* Workflow Guardrail */}
      <section className="max-w-7xl mx-auto mb-6">
        <div className="rounded-2xl p-4 bg-amber-50 border border-amber-200 text-amber-900 text-sm leading-relaxed">
          <b className="block mb-1">Workflow Guardrail</b>
          Mandatory fields must validate before submit. After submission, the request stays editable for 1 hour. Once OSL Operations approves it, the request locks and only stock release can proceed.
        </div>
      </section>

      {/* Status Cards */}
      <section className="max-w-7xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Request Status</h3>
            <span className="text-sm text-gray-500">Order #{order.id}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="h-8 px-3 rounded-full bg-blue-50 text-blue-600 flex items-center text-xs font-extrabold uppercase tracking-wider">Draft validated</span>
            <span className="h-8 px-3 rounded-full bg-blue-50 text-blue-600 flex items-center text-xs font-extrabold uppercase tracking-wider">1h adjustment window</span>
            <span className="h-8 px-3 rounded-full bg-blue-50 text-blue-600 flex items-center text-xs font-extrabold uppercase tracking-wider">Awaiting OSL review</span>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Checkout Summary</h3>
            <span className="text-sm text-gray-500">Current request</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Cart items</span>
              <strong className="text-gray-800">{order.items.length} line{order.items.length !== 1 ? 's' : ''}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Units</span>
              <strong className="text-gray-800">{order.items.reduce((acc, item) => acc + item.qty, 0)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated value</span>
              <strong className="text-gray-800">${order.value.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-800 font-bold">Route</span>
              <strong className="text-gray-800">Order Request → OSL Operations</strong>
            </div>
          </div>
        </div>
      </section>

      {/* WHO Official Form */}
      <section className="max-w-7xl mx-auto mb-8">
        <div className="bg-white text-gray-900 rounded-[22px] overflow-hidden border-2 border-[#d9e7fb] shadow-xl">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-[150px_1fr_210px]">
            <div className="min-h-[48px] px-4 py-2 flex items-center bg-white text-[#0b83d8] font-black text-sm border-b border-[#d9e7fb]">
              World Health Organization
            </div>
            <div className="min-h-[48px] flex items-center justify-center bg-white text-[#e02626] font-black text-2xl uppercase tracking-wider border-b border-[#d9e7fb]">
              Emergency
            </div>
            <div className="min-h-[48px] flex items-center justify-center bg-white text-gray-900 font-black text-xs text-center px-3 border-b border-[#d9e7fb]">
              REF: {order.ref}
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.65fr_0.75fr]">
            <div className="min-h-[34px] border-r border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-white">
              <b className="block mb-1">From (initiator):</b>
              <span className="font-bold">{order.initiator}</span>
            </div>
            <div className="min-h-[34px] border-r border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#f3f6fb] text-right font-bold">
              <b className="block mb-1">Mode of shipment:</b>
              <span>{order.shipmentMode}</span>
            </div>
            <div className="min-h-[34px] border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#eef6ff] text-center font-bold">
              <b className="block mb-1">PTEAO</b>
              <span>{order.pteao}</span>
            </div>

            <div className="min-h-[34px] border-r border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-white">
              <b className="block mb-1">Consignee address:</b>
              <span className="font-bold whitespace-pre-line">{order.consignee}</span>
            </div>
            <div className="min-h-[34px] border-r border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#f3f6fb] text-right font-bold">
              <b className="block mb-1">Nb of lines:</b>
              <span>{order.items.length}</span>
            </div>
            <div className="min-h-[34px] border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#eef6ff] font-bold">
              <b className="block mb-1">Estimated total cost:</b>
              <span>USD {order.value.toLocaleString()}</span>
            </div>

            <div className="min-h-[34px] border-r border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#f7f8fa]">
              <b className="block mb-1">To (processing unit):</b>
              {order.processingUnit}
            </div>
            <div className="min-h-[34px] border-r border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#f3f6fb] text-right font-bold">
              <b className="block mb-1">Estimated goods cost:</b>
              <span>USD {order.goodsCost.toLocaleString()}</span>
            </div>
            <div className="min-h-[34px] border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#eef6ff] font-bold">
              <b className="block mb-1">Requester ref:</b>
              <span>{order.requesterRef}</span>
            </div>

            <div className="min-h-[34px] border-r border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-white">
              <b className="block mb-1">Notify party:</b>
              <span className="whitespace-pre-line">{order.notify}</span>
            </div>
            <div className="min-h-[34px] border-r border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#f3f6fb] text-right font-bold">
              <b className="block mb-1">Requested ready on:</b>
              <span>{order.requestedReadyDate}</span>
            </div>
            <div className="min-h-[34px] border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#eef6ff] font-bold">
              <b className="block mb-1">Confirmed ready date:</b>
              {order.confirmedReadyDate}
            </div>

            <div className="min-h-[34px] border-r border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-white">
              <b className="block mb-1">Shipping dimensions:</b>
              <span>{order.dimensions}</span>
            </div>
            <div className="min-h-[34px] border-r border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#f3f6fb] text-right font-bold">
              <b className="block mb-1">Estimated weight (kg):</b>
              <span>{order.weight}</span>
            </div>
            <div className="min-h-[34px] border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#eef6ff] font-bold">
              <b className="block mb-1">Confirmed weight:</b>
              {order.confirmedWeight || 'Pending OSL'}
            </div>

            <div className="min-h-[34px] border-r border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-white">
              <b className="block mb-1">Remarks:</b>
              <span>{order.remarks}</span>
            </div>
            <div className="min-h-[34px] border-r border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#f3f6fb] text-right font-bold">
              <b className="block mb-1">Estimated volume (cbm):</b>
              <span>{order.volume}</span>
            </div>
            <div className="min-h-[34px] border-t border-[#d9e7fb] p-2 text-xs leading-tight bg-[#eef6ff] font-bold">
              <b className="block mb-1">Confirmed volume:</b>
              {order.confirmedVolume || 'Pending OSL'}
            </div>
          </div>

          {/* Line Items Section */}
          <div className="bg-[#11a7e8] text-white font-black uppercase tracking-wider p-2 px-3 border-t-2 border-white text-sm">
            Order request line items
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-gray-900 border-collapse">
              <thead>
                <tr className="bg-[#f3f6fb]">
                  <th className="border-r border-b border-[#d9e7fb] p-2 text-[11px] text-left font-bold">#</th>
                  <th className="border-r border-b border-[#d9e7fb] p-2 text-[11px] text-left font-bold">WHO code</th>
                  <th className="border-r border-b border-[#d9e7fb] p-2 text-[11px] text-left font-bold">WHO description</th>
                  <th className="border-r border-b border-[#d9e7fb] p-2 text-[11px] text-left font-bold">UoM</th>
                  <th className="border-r border-b border-[#d9e7fb] p-2 text-[11px] text-left font-bold">Quantity</th>
                  <th className="border-r border-b border-[#d9e7fb] p-2 text-[11px] text-left font-bold">Unit price USD</th>
                  <th className="border-r border-b border-[#d9e7fb] p-2 text-[11px] text-left font-bold">Total amount</th>
                  <th className="border-b border-[#d9e7fb] p-2 text-[11px] text-left font-bold">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#fafcff]'}>
                    <td className="border-r border-b border-[#d9e7fb] p-2 text-xs">{idx + 1}</td>
                    <td className="border-r border-b border-[#d9e7fb] p-2 text-xs font-bold">{item.product.sku}</td>
                    <td className="border-r border-b border-[#d9e7fb] p-2 text-xs">{item.product.name}</td>
                    <td className="border-r border-b border-[#d9e7fb] p-2 text-xs">{item.product.shape}</td>
                    <td className="border-r border-b border-[#d9e7fb] p-2 text-xs font-bold">{item.qty}</td>
                    <td className="border-r border-b border-[#d9e7fb] p-2 text-xs">{(item.product.price).toFixed(2)}</td>
                    <td className="border-r border-b border-[#d9e7fb] p-2 text-xs font-bold">{(item.product.price * item.qty).toFixed(2)}</td>
                    <td className="border-b border-[#d9e7fb] p-2 text-xs italic text-gray-400">checkout populated</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 border-t-2 border-[#11a7e8]">
            <div className="min-h-[88px] border-r border-[#d9e7fb] relative">
              <span className="absolute inset-x-0 top-2 text-center text-[#8b6d00] text-xs italic font-black">In charge of supply</span>
            </div>
            <div className="min-h-[88px] border-r border-[#d9e7fb] relative">
              <span className="absolute inset-x-0 top-2 text-center text-[#8b6d00] text-xs italic font-black">Reviewer</span>
            </div>
            <div className="min-h-[88px] relative">
              <span className="absolute inset-x-0 top-2 text-center text-[#8b6d00] text-xs italic font-black">Approver</span>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <button 
          onClick={onBack}
          className="px-6 py-3 rounded-full bg-white border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </button>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all">
            Save Draft
          </button>
          <button className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2">
            <CheckCircle2 size={20} />
            Validate & Send
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default OrderDetailView;
