import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ArrowUpDown, Download, AlertTriangle } from 'lucide-react';
import { Product } from '../types';

interface InventoryViewProps {
  products: Product[];
}

const InventoryView: React.FC<InventoryViewProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <p className="text-sm text-gray-500">Real-time stock levels and warehouse allocation.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50">
            <Download size={16} /> Export CSV
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100">
            + Add Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">Total SKUs</div>
          <div className="text-2xl font-black">{products.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">Low Stock Alerts</div>
          <div className="text-2xl font-black text-rose-600">
            {products.filter(p => p.stock < 100).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">Total Inventory Value</div>
          <div className="text-2xl font-black">
            ${products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between bg-gray-50/30">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter size={18} className="text-gray-500" />
            </button>
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <ArrowUpDown size={18} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Product</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">SKU</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Category</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Stock Level</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Status</th>
                <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-gray-400 font-bold">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold">{product.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">{product.shape}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{product.sku}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden min-w-[100px]">
                        <div 
                          className={`h-full rounded-full ${product.stock < 100 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min(100, (product.stock / 1000) * 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold">{product.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {product.stock < 100 ? (
                      <div className="flex items-center gap-1.5 text-rose-600 font-bold text-xs">
                        <AlertTriangle size={14} /> Low Stock
                      </div>
                    ) : (
                      <div className="text-emerald-600 font-bold text-xs">In Stock</div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-sm">
                    ${(product.price * product.stock).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default InventoryView;
