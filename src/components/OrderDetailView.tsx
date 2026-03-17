import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Package, 
  Truck, 
  FileText, 
  Download, 
  Printer,
  MoreVertical,
  Bell,
  Activity,
  ShieldAlert
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { COUNTRY_STATUS_LABELS } from '../constants';

interface OrderDetailViewProps {
  order: Order;
  onBack: () => void;
  onUpdateStatus?: (id: string, status: OrderStatus) => void;
}

const OrderDetailView: React.FC<OrderDetailViewProps> = ({ order, onBack, onUpdateStatus }) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'draft': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'submitted': 
      case 'under_coordination':
      case 'options_prepared':
      case 'awaiting_country_decision':
        return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'country_option_accepted':
      case 'stock_reserved':
      case 'stock_released':
        return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'shipped':
      case 'completed': 
        return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'flagged':
      case 'exception_raised':
        return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const workflowSteps = [
    { id: 'submitted', title: 'Submitted', desc: 'Order received by OSL.', status: order.status !== 'draft' ? 'done' : 'pending' },
    { id: 'coordination', title: 'AI Coordination', desc: 'Sourcing options being prepared.', status: !['draft', 'submitted', 'under_coordination'].includes(order.status) ? 'done' : (order.status === 'under_coordination' ? 'active' : 'pending') },
    { id: 'reserved', title: 'Stock Reserved', desc: 'Items allocated in warehouse.', status: ['stock_reserved', 'stock_released', 'shipped', 'completed'].includes(order.status) ? 'done' : (order.status === 'stock_reserved' ? 'active' : 'pending') },
    { id: 'released', title: 'Material Released', desc: 'Physical confirmation complete.', status: ['stock_released', 'shipped', 'completed'].includes(order.status) ? 'done' : (order.status === 'stock_released' ? 'active' : 'pending') },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-white shadow-[4px_4px_10px_#e6e9ef,-4px_-4px_10px_#ffffff] rounded-xl text-gray-400 hover:text-blue-600 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-black text-gray-800">Order Request</h2>
            <p className="text-sm text-gray-400 font-medium">Ref: {order.ref}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 flex items-center gap-2 font-bold text-sm">
            <Clock size={16} />
            <span>01:00:00</span>
          </div>
          <button className="px-4 py-2 bg-white shadow-[4px_4px_10px_#e6e9ef,-4px_-4px_10px_#ffffff] rounded-xl text-gray-600 font-bold text-sm flex items-center gap-2 hover:shadow-md transition-all">
            <Download size={16} />
            Download PDF
          </button>
          {order.status === 'draft' && (
            <button 
              onClick={() => onUpdateStatus?.(order.id, 'submitted')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 flex items-center gap-2 hover:bg-blue-700 transition-all"
            >
              <CheckCircle2 size={16} />
              Validate & Send
            </button>
          )}
          {order.status === 'stock_released' && (
            <button 
              onClick={() => onUpdateStatus?.(order.id, 'shipped')}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 flex items-center gap-2 hover:bg-emerald-700 transition-all"
            >
              <Truck size={16} />
              Confirm Shipment
            </button>
          )}
          {order.status === 'shipped' && (
            <button 
              onClick={() => onUpdateStatus?.(order.id, 'completed')}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 flex items-center gap-2 hover:bg-emerald-700 transition-all"
            >
              <CheckCircle2 size={16} />
              Complete Delivery
            </button>
          )}
        </div>
      </div>

      {/* Workflow & Info Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Workflow Rail */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-[28px] shadow-[8px_8px_20px_#e6e9ef,-8px_-8px_20px_#ffffff] border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-gray-700 flex items-center gap-2">
                <Activity size={18} className="text-blue-500" />
                Workflow Rail
              </h3>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Exception-First Orchestration</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {workflowSteps.map((step, idx) => (
                <div key={step.id} className={`relative p-4 rounded-2xl border transition-all ${
                  step.status === 'done' ? 'bg-emerald-50 border-emerald-100' : 
                  step.status === 'active' ? 'bg-blue-50 border-blue-100 ring-2 ring-blue-500/10' : 
                  'bg-gray-50 border-gray-100 opacity-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      step.status === 'done' ? 'bg-emerald-500' : 
                      step.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <span className={`text-[10px] font-black uppercase tracking-wider ${
                      step.status === 'done' ? 'text-emerald-600' : 
                      step.status === 'active' ? 'text-blue-600' : 'text-gray-400'
                    }`}>Step 0{idx + 1}</span>
                  </div>
                  <h4 className="font-bold text-gray-700 text-sm mb-1">{step.title}</h4>
                  <p className="text-[10px] text-gray-400 font-medium leading-tight">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Exception Pack */}
          <div className="bg-white p-6 rounded-[28px] shadow-[8px_8px_20px_#e6e9ef,-8px_-8px_20px_#ffffff] border border-white/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-700 flex items-center gap-2">
                <ShieldAlert size={18} className="text-orange-500" />
                Exception Pack
              </h3>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Raise Exception</button>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
              <AlertCircle size={20} className="text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-orange-800">No active exceptions</p>
                <p className="text-xs text-orange-600 font-medium mt-1">Instead of returning the full request, OSL raises only targeted exceptions. Requester amends the exact fields and resubmits.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panels: Inbox & Events */}
        <div className="flex flex-col gap-6">
          {/* Live Inbox */}
          <div className="bg-white p-6 rounded-[28px] shadow-[8px_8px_20px_#e6e9ef,-8px_-8px_20px_#ffffff] border border-white/50 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-700 flex items-center gap-2">
                <Bell size={18} className="text-blue-500" />
                Live Inbox
              </h3>
              <div className="w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">2</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Requester</span>
                  <span className="text-[10px] font-bold text-gray-400">10:24 AM</span>
                </div>
                <p className="text-xs font-bold text-gray-700">Draft Created</p>
                <p className="text-[10px] text-gray-500 font-medium mt-0.5">Order {order.ref} is ready for final validation.</p>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl opacity-60">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">System</span>
                  <span className="text-[10px] font-bold text-gray-400">09:15 AM</span>
                </div>
                <p className="text-xs font-bold text-gray-700">Workflow Online</p>
                <p className="text-[10px] text-gray-500 font-medium mt-0.5">Unified order-to-stock workflow loaded.</p>
              </div>
            </div>
          </div>

          {/* Event Stream */}
          <div className="bg-white p-6 rounded-[28px] shadow-[8px_8px_20px_#e6e9ef,-8px_-8px_20px_#ffffff] border border-white/50 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-700 flex items-center gap-2">
                <Activity size={18} className="text-emerald-500" />
                Event Stream
              </h3>
            </div>
            <div className="flex flex-col gap-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              <div className="flex gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-blue-100 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-700">{COUNTRY_STATUS_LABELS[order.status]}</p>
                  <p className="text-[10px] text-gray-400 font-medium">Current status updated.</p>
                  <span className="text-[9px] font-bold text-gray-300 uppercase mt-1 block">Just now</span>
                </div>
              </div>
              <div className="flex gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-gray-100 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-700">Order Submitted</p>
                  <p className="text-[10px] text-gray-400 font-medium">WHO Order Request Form received.</p>
                  <span className="text-[9px] font-bold text-gray-300 uppercase mt-1 block">{order.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHO Official Form */}
      <div className="bg-white rounded-[28px] shadow-[12px_12px_30px_#e6e9ef,-12px_-12px_30px_#ffffff] border-2 border-blue-100 overflow-hidden">
        {/* Form Header */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_250px] border-b border-blue-100">
          <div className="p-4 flex items-center gap-3 border-r border-blue-100">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl">W</div>
            <div className="leading-none">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">World Health</p>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">Organization</p>
            </div>
          </div>
          <div className="p-4 flex flex-col items-center justify-center bg-white">
            <h1 className="text-2xl font-black text-red-600 uppercase tracking-widest">Order Request</h1>
            <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">Official Procurement Document</p>
          </div>
          <div className="p-4 bg-yellow-50 flex flex-col items-center justify-center border-l border-blue-100">
            <span className="text-[10px] font-black text-yellow-700 uppercase tracking-widest mb-1">Reference Number</span>
            <span className="text-lg font-black text-gray-800">{order.ref}</span>
          </div>
        </div>

        {/* Form Meta Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-blue-100">
          <div className="p-4 border-r border-blue-100 bg-gray-50/50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Description</label>
            <textarea 
              className="w-full bg-transparent border-0 font-bold text-gray-700 text-sm focus:ring-0 p-0 resize-none"
              defaultValue={order.description || "Replenish order for stock replenishment - Kenya"}
              rows={2}
            />
          </div>
          <div className="p-4 border-r border-blue-100 flex flex-col justify-center items-center">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Date</label>
            <span className="text-sm font-black text-gray-700">{order.date}</span>
          </div>
          <div className="p-4 flex flex-col justify-center items-center bg-gray-50/50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Version</label>
            <span className="text-sm font-black text-gray-700">{order.version || "1.0"}</span>
          </div>
        </div>

        {/* Form Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-1 border-r border-blue-100">
            <div className="p-4 border-b border-blue-100 bg-yellow-50/30">
              <label className="text-[10px] font-black text-yellow-700 uppercase tracking-widest block mb-2">From (Initiator)</label>
              <textarea 
                className="w-full bg-transparent border-0 font-bold text-gray-700 text-sm focus:ring-0 p-0 resize-none"
                defaultValue={order.initiator}
                rows={3}
              />
            </div>
            <div className="p-4 border-b border-blue-100">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">To (Processing Unit)</label>
              <p className="text-sm font-bold text-gray-700">{order.processingUnit}</p>
            </div>
            <div className="p-4 border-b border-blue-100">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Notify Party</label>
              <textarea 
                className="w-full bg-transparent border-0 font-bold text-gray-700 text-xs focus:ring-0 p-0 resize-none"
                defaultValue={order.notify}
                rows={4}
              />
            </div>
            <div className="p-4 bg-gray-50/30">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Shipping Dimensions</label>
              <textarea 
                className="w-full bg-transparent border-0 font-bold text-gray-700 text-xs focus:ring-0 p-0 resize-none"
                defaultValue={order.dimensions}
                rows={3}
              />
            </div>
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-1 border-r border-blue-100">
            <div className="p-4 border-b border-blue-100 bg-yellow-50/30">
              <label className="text-[10px] font-black text-yellow-700 uppercase tracking-widest block mb-2">Consignee Address</label>
              <textarea 
                className="w-full bg-transparent border-0 font-bold text-gray-700 text-sm focus:ring-0 p-0 resize-none"
                defaultValue={order.consignee}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 border-b border-blue-100">
              <div className="p-4 border-r border-blue-100 bg-gray-50/30">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Mode of Shipment</label>
                <input className="w-full bg-transparent border-0 font-bold text-gray-700 text-sm focus:ring-0 p-0" defaultValue={order.shipmentMode} />
              </div>
              <div className="p-4 bg-gray-50/30">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Nb of Lines</label>
                <span className="text-sm font-black text-gray-700">{order.items.length}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-blue-100">
              <div className="p-4 border-r border-blue-100">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Est. Goods Cost</label>
                <span className="text-sm font-black text-gray-700">USD {order.goodsCost.toLocaleString()}</span>
              </div>
              <div className="p-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Requested Ready</label>
                <input className="w-full bg-transparent border-0 font-bold text-gray-700 text-sm focus:ring-0 p-0" defaultValue={order.requestedReadyDate} />
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-blue-100">
              <div className="p-4 border-r border-blue-100 bg-gray-50/30">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Est. Weight (kg)</label>
                <span className="text-sm font-black text-gray-700">{order.weight}</span>
              </div>
              <div className="p-4 bg-gray-50/30">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Est. Volume (cbm)</label>
                <span className="text-sm font-black text-gray-700">{order.volume}</span>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="p-4 border-r border-blue-100">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Est. Nb Parcels</label>
                <input type="number" className="w-full bg-transparent border-0 font-bold text-gray-700 text-sm focus:ring-0 p-0" defaultValue={order.estimatedNbParcels || 0} />
              </div>
              <div className="p-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Est. Ship Cost</label>
                <input type="number" className="w-full bg-transparent border-0 font-bold text-gray-700 text-sm focus:ring-0 p-0" defaultValue={order.estimatedShipCost || 0} />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="p-4 border-b border-blue-100 bg-blue-50/30">
              <label className="text-[10px] font-black text-blue-700 uppercase tracking-widest block mb-2">PTEAO</label>
              <input 
                className="w-full bg-transparent border-0 font-black text-red-600 text-sm focus:ring-0 p-0" 
                placeholder="CF7SD0000000 - 00.0 - 00000"
                defaultValue={order.pteao}
              />
            </div>
            <div className="p-4 border-b border-blue-100 bg-blue-50/30">
              <label className="text-[10px] font-black text-blue-700 uppercase tracking-widest block mb-1">Estimated Total Cost</label>
              <span className="text-lg font-black text-gray-800">USD {order.value.toLocaleString()}</span>
            </div>
            <div className="p-4 border-b border-blue-100 bg-blue-50/30">
              <label className="text-[10px] font-black text-blue-700 uppercase tracking-widest block mb-1">Requester Ref</label>
              <input className="w-full bg-transparent border-0 font-bold text-gray-700 text-sm focus:ring-0 p-0" defaultValue={order.requesterRef} />
            </div>
            <div className="p-4 border-b border-blue-100 bg-blue-50/30">
              <label className="text-[10px] font-black text-blue-700 uppercase tracking-widest block mb-1">Conf. Ready Date</label>
              <span className="text-sm font-black text-gray-400">{order.confirmedReadyDate}</span>
            </div>
            <div className="grid grid-cols-2 border-b border-blue-100 bg-blue-50/30">
              <div className="p-4 border-r border-blue-100">
                <label className="text-[10px] font-black text-blue-700 uppercase tracking-widest block mb-1">Confirmed Weight</label>
                <span className="text-sm font-black text-gray-400">{order.confirmedWeight}</span>
              </div>
              <div className="p-4">
                <label className="text-[10px] font-black text-blue-700 uppercase tracking-widest block mb-1">Confirmed Volume</label>
                <span className="text-sm font-black text-gray-400">{order.confirmedVolume}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 bg-blue-50/30">
              <div className="p-4 border-r border-blue-100">
                <label className="text-[10px] font-black text-blue-700 uppercase tracking-widest block mb-1">Nb Parcels</label>
                <span className="text-sm font-black text-gray-400">{order.nbParcels || "-"}</span>
              </div>
              <div className="p-4">
                <label className="text-[10px] font-black text-blue-700 uppercase tracking-widest block mb-1">Nb Boxes</label>
                <span className="text-sm font-black text-gray-400">{order.nbBoxes || "-"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purpose Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px_250px] border-y border-blue-100">
          <div className="p-4 border-r border-blue-100">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Order Request Purpose</label>
            <p className="text-[10px] text-gray-400 italic mb-2">Indicate if for Response, Preparedness, Stockpile, Donation as request applies</p>
            <textarea 
              className="w-full bg-transparent border-0 font-bold text-red-600 text-xs focus:ring-0 p-0 resize-none italic"
              defaultValue={order.purpose || "Example - This order is for Venus space station stock replenishment replacing Cholera kits, cholera beds, Tents, Cholera investigation kits shipped from Kenya emergency hub/Kenya to Venus Space Station."}
              rows={3}
            />
          </div>
          <div className="p-4 border-r border-blue-100 bg-blue-50/50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Freight Charges Payable</label>
            <input className="w-full bg-transparent border-0 font-bold text-gray-700 text-sm focus:ring-0 p-0" defaultValue={order.freightChargesPayable || "WHO"} />
          </div>
          <div className="p-4 bg-gray-50/50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Shipping Documents Required</label>
            <textarea 
              className="w-full bg-transparent border-0 font-bold text-gray-700 text-xs focus:ring-0 p-0 resize-none"
              defaultValue={order.shippingDocumentsRequired || "Packing list, release note, airway bill copy"}
              rows={2}
            />
          </div>
        </div>

        {/* Remarks Section */}
        <div className="p-4 border-b border-blue-100">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Remarks</label>
          <textarea 
            className="w-full bg-transparent border-0 font-bold text-gray-700 text-sm focus:ring-0 p-0 resize-none"
            defaultValue={order.remarks}
            rows={2}
          />
        </div>

        {/* Line Items Table */}
        <div className="bg-blue-600 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">Order Request Line Items</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-blue-100">
                <th className="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider border-r border-blue-100 w-10">#</th>
                <th className="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider border-r border-blue-100">WHO Code</th>
                <th className="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider border-r border-blue-100">WHO Description</th>
                <th className="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider border-r border-blue-100">Unit of Measure</th>
                <th className="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider border-r border-blue-100">Quantity</th>
                <th className="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider border-r border-blue-100">Unit Price USD</th>
                <th className="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider border-r border-blue-100">Total Amount ($)</th>
                <th className="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} className="border-b border-blue-50 hover:bg-blue-50/30 transition-colors">
                  <td className="p-3 text-xs font-bold text-gray-500 border-r border-blue-100">{idx + 1}</td>
                  <td className="p-3 text-xs font-black text-gray-700 border-r border-blue-100">{item.product.sku}</td>
                  <td className="p-3 text-xs font-bold text-gray-600 border-r border-blue-100">{item.product.name}</td>
                  <td className="p-3 text-xs font-bold text-gray-600 border-r border-blue-100">{item.product.uom}</td>
                  <td className="p-3 text-xs font-black text-gray-700 border-r border-blue-100">{item.qty}</td>
                  <td className="p-3 text-xs font-bold text-gray-600 border-r border-blue-100">${item.product.price.toFixed(2)}</td>
                  <td className="p-3 text-xs font-black text-blue-600 border-r border-blue-100">${(item.qty * item.product.price).toFixed(2)}</td>
                  <td className="p-3 text-xs font-medium text-gray-400 italic">Checkout populated</td>
                </tr>
              ))}
              {/* Empty rows to match form aesthetic */}
              {[...Array(Math.max(0, 5 - order.items.length))].map((_, i) => (
                <tr key={`empty-${i}`} className="border-b border-blue-50 h-10">
                  <td className="p-3 border-r border-blue-100" />
                  <td className="p-3 border-r border-blue-100" />
                  <td className="p-3 border-r border-blue-100" />
                  <td className="p-3 border-r border-blue-100" />
                  <td className="p-3 border-r border-blue-100" />
                  <td className="p-3 border-r border-blue-100" />
                  <td className="p-3 border-r border-blue-100" />
                  <td className="p-3" />
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-black">
                <td colSpan={6} className="p-3 text-right text-xs uppercase tracking-widest border-r border-blue-100">Total</td>
                <td className="p-3 text-sm text-blue-600 border-r border-blue-100">${order.value.toFixed(2)}</td>
                <td className="p-3" />
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-3 border-t-2 border-blue-600">
          <div className="p-4 border-r border-blue-100">
            <div className="text-center mb-6">
              <span className="text-[10px] font-black text-yellow-700 uppercase tracking-widest italic">In charge of supply</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-[9px] font-black text-gray-400 uppercase">Name:</span>
                <span className="text-[10px] font-bold text-gray-700">Ava Lewis</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-[9px] font-black text-gray-400 uppercase">Signature:</span>
                <span className="text-[10px] font-bold text-gray-300 italic">Digital Sign</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] font-black text-gray-400 uppercase">Date:</span>
                <span className="text-[10px] font-bold text-gray-700">{order.date}</span>
              </div>
            </div>
          </div>
          <div className="p-4 border-r border-blue-100 bg-gray-50/30">
            <div className="text-center mb-6">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Reviewer</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-[9px] font-black text-gray-400 uppercase">Name:</span>
                <span className="text-[10px] font-bold text-gray-300">Pending Review</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-[9px] font-black text-gray-400 uppercase">Signature:</span>
                <span className="text-[10px] font-bold text-gray-300">---</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] font-black text-gray-400 uppercase">Date:</span>
                <span className="text-[10px] font-bold text-gray-300">---</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-emerald-50/30">
            <div className="text-center mb-6">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest italic">Approver</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-[9px] font-black text-gray-400 uppercase">Name:</span>
                <span className="text-[10px] font-bold text-gray-300">Pending Approval</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-[9px] font-black text-gray-400 uppercase">Signature:</span>
                <span className="text-[10px] font-bold text-gray-300">---</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] font-black text-gray-400 uppercase">Date:</span>
                <span className="text-[10px] font-bold text-gray-300">---</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetailView;
