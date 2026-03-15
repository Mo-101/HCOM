import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Boxes, Package, AlertTriangle, Search, Filter, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import { warehouseAPI } from '../services/api';
import Loading from './Loading';
import toast from 'react-hot-toast';

function InventoryView() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllInventory = async () => {
    setIsLoading(true);
    try {
      // Mocking a global inventory fetch by combining data from multiple warehouses
      const response1 = await warehouseAPI.getInventory(1);
      const response2 = await warehouseAPI.getInventory(2);
      
      if (response1.success && response2.success) {
        // Add warehouse info to items
        const inv1 = response1.data.inventory.map((item: any) => ({ ...item, warehouse: 'Main Warehouse' }));
        const inv2 = response2.data.inventory.map((item: any) => ({ ...item, warehouse: 'Regional Hub' }));
        setInventory([...inv1, ...inv2]);
      }
    } catch (err: any) {
      toast.error('Failed to fetch global inventory');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInventory();
  }, []);

  const filteredInventory = inventory.filter(item => 
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.warehouse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockCount = inventory.filter(item => item.quantity < item.reorder_point).length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
        <div>
          <h2 className="text-2xl font-black text-gray-800">Global Inventory</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Consolidated Stock Levels Across All Hubs</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchAllInventory}
            className="p-2 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw size={18} className={`text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search inventory..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <Boxes size={24} />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
              <ArrowUpRight size={14} />
              +12%
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Stock Units</div>
          <div className="text-3xl font-black text-gray-800">
            {inventory.reduce((acc, item) => acc + item.quantity, 0).toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
              <AlertTriangle size={24} />
            </div>
            <div className="flex items-center gap-1 text-rose-500 text-xs font-bold">
              <ArrowUpRight size={14} />
              +3
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Low Stock Alerts</div>
          <div className="text-3xl font-black text-gray-800">{lowStockCount}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
              <Package size={24} />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
              <ArrowDownRight size={14} />
              -5%
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Unique SKUs</div>
          <div className="text-3xl font-black text-gray-800">{new Set(inventory.map(i => i.sku)).size}</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/30">
          <h3 className="text-lg font-black text-gray-800">Inventory Master List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/30">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">SKU</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Product Name</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Warehouse</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black text-center">Quantity</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-black">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12"><Loading /></td>
                </tr>
              ) : filteredInventory.length > 0 ? (
                filteredInventory.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-xs text-blue-600">{item.sku}</td>
                    <td className="px-6 py-4 font-bold text-sm text-gray-800">{item.product_name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        <span className="text-xs font-bold text-gray-500">{item.warehouse}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-black text-gray-800">{item.quantity} {item.unit}</span>
                    </td>
                    <td className="px-6 py-4">
                      {item.quantity < item.reorder_point ? (
                        <span className="px-2 py-1 bg-rose-100 text-rose-600 rounded-lg text-[10px] font-black uppercase tracking-wider">Low Stock</span>
                      ) : (
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider">Optimal</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-bold italic">
                    No inventory items found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default InventoryView;
