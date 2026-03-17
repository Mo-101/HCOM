import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  MapPin,
  Truck,
  Bell,
  Info,
  CheckCircle2,
  X,
  AlertTriangle
} from 'lucide-react';
import { Product, Order } from '../types';
import { COUNTRY_PROFILES } from '../constants';

interface WHOOrderFormProps {
  cart: { product: Product, qty: number }[];
  currentUser: { name: string, country: string };
  onSubmit: (orderData: Partial<Order>) => void;
  onCancel: () => void;
}

export default function WHOOrderForm({ cart, currentUser, onSubmit, onCancel }: WHOOrderFormProps) {
  const profile = COUNTRY_PROFILES.find(p => p.country === currentUser.country) || COUNTRY_PROFILES[0];

  const [formData, setFormData] = useState({
    consignee: profile.consignee,
    address: profile.address,
    notify: profile.notify,
    shipmentMode: profile.shipmentMode,
    pteao: profile.pteao,
    purpose: 'Response - Stock replenishment for emergency operations',
    description: 'Emergency replenishment for regional hub',
    remarks: '',
    freightChargesPayable: 'WHO',
    shippingDocumentsRequired: 'Packing list, Release note, Airway bill'
  });

  const totalValue = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!cart || cart.length === 0) {
      alert('No items in cart. Please select items from the catalog first.');
      return;
    }
    if (!formData.consignee || !formData.address || !formData.notify) {
      alert('Please fill consignee, notify and address fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">WHO Order Request Form</h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Official Procurement Document</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Section 1: Requester Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
              <Info size={16} />
              1. Requester & Purpose
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Initiator</label>
                <input
                  type="text"
                  value={currentUser.name}
                  disabled
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-500 cursor-not-allowed"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Country / Office</label>
                <input
                  type="text"
                  value={currentUser.country}
                  disabled
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-500 cursor-not-allowed"
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Purpose of Request</label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:border-blue-500 outline-none transition-all"
                >
                  <option>Response - Stock replenishment for emergency operations</option>
                  <option>Preparedness - Stock replenishment</option>
                  <option>Routine - Programmatic support</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Consignee & Delivery */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
              <MapPin size={16} />
              2. Consignee & Delivery Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Consignee Name</label>
                <input
                  type="text"
                  value={formData.consignee}
                  onChange={(e) => setFormData({ ...formData, consignee: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Notify Party</label>
                <input
                  type="email"
                  value={formData.notify}
                  onChange={(e) => setFormData({ ...formData, notify: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Delivery Address</label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:border-blue-500 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Logistics & Finance */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
              <Truck size={16} />
              3. Logistics & Finance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Shipment Mode</label>
                <select
                  value={formData.shipmentMode}
                  onChange={(e) => setFormData({ ...formData, shipmentMode: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:border-blue-500 outline-none transition-all"
                >
                  <option>Air Freight</option>
                  <option>Sea Freight</option>
                  <option>Road Transport</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">PTEAO Code</label>
                <input
                  type="text"
                  value={formData.pteao}
                  onChange={(e) => setFormData({ ...formData, pteao: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Items Summary */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 size={16} />
              4. Items Summary
            </h3>
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <th className="pb-4">Item Description</th>
                    <th className="pb-4 text-center">Qty</th>
                    <th className="pb-4 text-right">Est. Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cart.map((item, i) => (
                    <tr key={i}>
                      <td className="py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-700">{item.product.name}</span>
                          <span className="text-[10px] text-gray-400 font-medium">{item.product.sku}</span>
                        </div>
                      </td>
                      <td className="py-3 text-center text-sm font-black text-gray-800">{item.qty}</td>
                      <td className="py-3 text-right text-sm font-black text-blue-600">${(item.product.price * item.qty).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-200">
                    <td colSpan={2} className="pt-4 text-sm font-black text-gray-800 text-right uppercase tracking-widest">Total Estimated Value:</td>
                    <td className="pt-4 text-xl font-black text-blue-600 text-right">${totalValue.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Alert */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
            <AlertTriangle size={20} className="text-amber-600 shrink-0" />
            <p className="text-[10px] font-bold text-amber-700 leading-relaxed">
              By submitting this form, you confirm that the requested items are essential for WHO operations and that funding is secured via the provided PTEAO code.
            </p>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-8 py-3 bg-white shadow-sm border border-gray-200 rounded-2xl text-sm font-black text-gray-500 uppercase tracking-widest hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
          >
            Submit Order Request
          </button>
        </div>
      </motion.div>
    </div>
  );
}
