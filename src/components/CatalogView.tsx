import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, PlusCircle, ArrowLeft, CheckCircle2, ShoppingCart, Minus, Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  useCase: string;
  shelfLife: string;
  shape: 'kit' | 'mask' | 'glove';
  description: string;
  usage: string;
  dosage: string;
  included: string;
  storage: string;
  list: string[];
}

interface CatalogViewProps {
  products: Product[];
  onAddToCart: (product: Product, qty: number) => void;
  onCheckout: () => void;
}

function CatalogView({ products, onAddToCart, onCheckout }: CatalogViewProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <AnimatePresence mode="wait">
        {!selectedProduct ? (
          <motion.div 
            key="catalog"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          >
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-3">Categories</div>
                  {['All Products', 'Emergency Kits', 'PPE', 'Respiratory Care', 'Sterile Accessories'].map((cat, i) => (
                    <button 
                      key={i} 
                      className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-sm font-bold transition-colors ${i === 0 ? 'bg-blue-50 text-blue-600' : 'bg-white border border-gray-100 hover:bg-gray-50'}`}
                    >
                      {cat}
                      <span className="text-[10px] opacity-50">18</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <motion.div 
                    key={product.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 !p-0 overflow-hidden cursor-pointer group"
                    onClick={() => { setSelectedProduct(product); setQuantity(1); }}
                  >
                    <div className="h-40 bg-gradient-to-b from-blue-50 to-blue-100 p-6 relative">
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                        {product.category}
                      </span>
                      <div className="absolute right-6 bottom-4 w-32 h-28 bg-gradient-to-b from-blue-200 to-blue-300 rounded-[30px] shadow-xl flex items-center justify-center">
                        {product.shape === 'kit' && <PlusCircle size={48} className="text-white" />}
                        {product.shape === 'mask' && <div className="w-16 h-8 bg-white rounded-lg shadow-md" />}
                        {product.shape === 'glove' && <div className="w-10 h-14 bg-white rounded-t-full shadow-md" />}
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">{product.name}</h4>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">SKU {product.sku}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-extrabold">${product.price}</div>
                          <span className="text-[10px] text-gray-400 font-bold">per unit</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-[11px] font-bold text-gray-500">
                        <div>Stock<div className="text-gray-900">{product.stock} Units</div></div>
                        <div>Shelf Life<div className="text-gray-900">{product.shelfLife}</div></div>
                      </div>
                      <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline"
              >
                <ArrowLeft size={16} /> Back to catalog
              </button>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px] bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
                <div className="w-64 h-56 bg-gradient-to-b from-blue-200 to-blue-300 rounded-[40px] shadow-2xl flex items-center justify-center">
                   {selectedProduct.shape === 'kit' && <PlusCircle size={80} className="text-white" />}
                   {selectedProduct.shape === 'mask' && <div className="w-32 h-16 bg-white rounded-2xl shadow-lg" />}
                   {selectedProduct.shape === 'glove' && <div className="w-20 h-28 bg-white rounded-t-full shadow-lg" />}
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="text-xl font-bold">Usage Guidance</h3>
                <ul className="space-y-3">
                  {selectedProduct.list.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">{selectedProduct.name}</h2>
                    <p className="text-gray-500 mt-2 leading-relaxed">{selectedProduct.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-extrabold text-blue-600">${selectedProduct.price}</div>
                    <span className="text-xs text-gray-400 font-bold">per unit • tax excluded</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">Usage</div>
                    <div className="text-sm font-bold leading-snug">{selectedProduct.usage}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">Dosage / Note</div>
                    <div className="text-sm font-bold leading-snug">{selectedProduct.dosage}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">Included</div>
                    <div className="text-sm font-bold leading-snug">{selectedProduct.included}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">Storage</div>
                    <div className="text-sm font-bold leading-snug">{selectedProduct.storage}</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 p-2 bg-gray-50 rounded-full border border-gray-100">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 font-bold hover:bg-blue-50"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="text-lg font-extrabold px-2">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 font-bold hover:bg-blue-50"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Estimated Total</div>
                      <div className="text-2xl font-extrabold">${(selectedProduct.price * quantity).toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => { onAddToCart(selectedProduct, quantity); setSelectedProduct(null); }}
                      className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => {
                        onAddToCart(selectedProduct, quantity);
                        onCheckout();
                      }}
                      className="px-6 py-4 bg-white border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 flex items-center gap-2"
                    >
                      <ShoppingCart size={20} />
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CatalogView;
