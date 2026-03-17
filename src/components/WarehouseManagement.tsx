import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { warehouseAPI } from '../services/api';
import toast from 'react-hot-toast';
import Loading from './Loading';

const WarehouseManagement: React.FC = () => {
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWarehouses = async () => {
    setIsLoading(true);
    try {
      const response = await warehouseAPI.getAll();
      if (response.success) {
        setWarehouses(response.data.warehouses);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch warehouses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">Warehouse Management</h3>
          <p className="text-gray-500">Manage global warehouse locations and stock levels.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700">
          + Add Warehouse
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {warehouses.map((wh) => (
            <motion.div 
              key={wh.id}
              whileHover={{ y: -5 }}
              className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 mb-1">{wh.code}</div>
                  <h4 className="text-lg font-bold">{wh.name}</h4>
                </div>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase">
                  Operational
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-white rounded-xl border border-gray-100">
                  <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Stock Level</div>
                  <div className="font-black">84% Capacity</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-100">
                  <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Pending Orders</div>
                  <div className="font-black">12 Orders</div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50">
                  View Inventory
                </button>
                <button className="flex-1 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50">
                  Edit Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WarehouseManagement;
