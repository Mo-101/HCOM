import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, PlusCircle, ArrowLeft, CheckCircle2, ShoppingCart, Minus, Plus, Tag, Heart, Filter, ArrowUpDown, Grid3X3, List as ListIcon, Star, Truck, ShieldCheck, RefreshCcw, Headphones, Info, ChevronRight, Package, Zap } from 'lucide-react';
import { Product } from '../types';
import { CURRENCIES } from '../constants';

// Import product images
import unfpaImg from '../../public/UNFPA__1_-removebg-preview.png';
import nitrileGlovesImg from '../../public/Nitrile-examination.png';
import iehkKitImg from '../../public/iehk-kit-illustration-removebg-preview.png';
import safetyBootsImg from '../../public/Green-PVC-Plastic-Safety-Gumboots-with-Steel-Toe-Caps-Safety-Rain-Boots-removebg-preview.png';
import medicalSuppliesImg from '../../public/ida-medical-supplies-open-removebg-preview.png';
import isolationUnitImg from '../../public/isolation-transport-unit-removebg-preview.png';
import biomedicalImg from '../../public/Biomedical-Consumables-removebg-preview.png';
import coldChainFreezerImg from '../../public/cold-chain-freezer-removebg-preview.png';
import freezerAucmaImg from '../../public/freezer-aucma-removebg-preview.png';
import diagnosticTestKitImg from '../../public/diagnostic-test-kit-removebg-preview.png';
import rotantaImg from '../../public/Rotanta-460_-removebg-preview.png';
import fridgeImg from '../../public/fridge-removebg-preview.png';
import concoeImg from '../../public/concoe-removebg-preview.png';
import coverallImg from '../../public/Disposable-Safety-Type-5-6-Microporous-Coverall-Chemical-Protective-Clothing-removebg-preview.png';
import respiratorImg from '../../public/Respirator_21-FFP2-Mask-1-removebg-preview.png';
import traumaKitImg from '../../public/trauma-first-aid-kit-removebg-preview.png';

// Map product IDs to imported images
const productImages: Record<string, string> = {
  '1': unfpaImg,
  '2': nitrileGlovesImg,
  '3': iehkKitImg,
  '4': safetyBootsImg,
  '5': medicalSuppliesImg,
  '6': isolationUnitImg,
  '7': biomedicalImg,
  '8': coldChainFreezerImg,
  '9': freezerAucmaImg,
  '10': diagnosticTestKitImg,
  '11': rotantaImg,
  '12': fridgeImg,
  '13': concoeImg,
  '14': coverallImg,
  '15': respiratorImg,
  '16': traumaKitImg,
};

interface CatalogViewProps {
  products: Product[];
  onAddToCart: (product: Product, qty: number) => void;
  onCheckout: () => void;
}

function CatalogView({ products, onAddToCart, onCheckout }: CatalogViewProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentCurrency, setCurrentCurrency] = useState(CURRENCIES[0]);
  const [activeTab, setActiveTab] = useState('specs');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || p.category.toLowerCase().includes(activeCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  const formatPrice = (price: number) => {
    return (price * currentCurrency.rate).toFixed(2);
  };

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'emergency', label: 'Emergency Health Kits' },
    { id: 'ppe', label: 'PPE & Protection' },
    { id: 'diagnostics', label: 'Diagnostics' },
    { id: 'firstaid', label: 'First Aid' },
    { id: 'medications', label: 'Medications' },
  ];

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
            className="space-y-8"
          >
            {/* Header with Currency Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Medical Products</h1>
                <p className="text-gray-500 mt-1">Browse emergency health kits, PPE, and medical supplies</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-medium">Currency:</span>
                  <select
                    value={currentCurrency.code}
                    onChange={(e) => setCurrentCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0])}
                    className="bg-white shadow-[inset_3px_3px_6px_#e6e9ef,inset_-3px_-3px_6px_#ffffff] px-4 py-2 text-sm font-semibold text-gray-700 rounded-xl border-none outline-none cursor-pointer"
                  >
                    {CURRENCIES.map(c => (
                      <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.1)] scale-105'
                    : 'bg-white text-gray-600 shadow-[4px_4px_8px_#e6e9ef,-4px_-4px_8px_#ffffff] hover:bg-blue-600 hover:text-white'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white shadow-[8px_8px_16px_#e6e9ef,-8px_-8px_16px_#ffffff] p-4 rounded-[20px] border border-white/20 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="bg-white shadow-[inset_4px_4px_8px_#e6e9ef,inset_-4px_-4px_8px_#ffffff] flex items-center gap-3 px-4 py-3 rounded-xl flex-1 w-full md:w-auto">
                <Search className="text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products, SKUs, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm text-gray-700 w-full"
                />
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button className="bg-white shadow-[6px_6px_12px_#e6e9ef,-6px_-6px_12px_#ffffff] px-5 py-3 text-sm font-medium text-gray-600 flex items-center gap-2 rounded-full hover:shadow-[4px_4px_8px_#e6e9ef,-4px_-4px_8px_#ffffff] transition-all">
                  <Filter size={16} />
                  Filters
                </button>
                <button className="bg-white shadow-[6px_6px_12px_#e6e9ef,-6px_-6px_12px_#ffffff] px-5 py-3 text-sm font-medium text-gray-600 flex items-center gap-2 rounded-full hover:shadow-[4px_4px_8px_#e6e9ef,-4px_-4px_8px_#ffffff] transition-all">
                  <ArrowUpDown size={16} />
                  Sort
                </button>
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white shadow-[6px_6px_12px_#e6e9ef,-6px_-6px_12px_#ffffff] px-4 py-3 rounded-xl">
                    <Grid3X3 size={16} />
                  </button>
                  <button className="bg-white shadow-[6px_6px_12px_#e6e9ef,-6px_-6px_12px_#ffffff] px-4 py-3 text-gray-600 rounded-xl">
                    <ListIcon size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -8 }}
                  className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[24px] overflow-hidden group relative transition-all duration-400 hover:bg-white/90 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,94,184,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]"
                  onClick={() => { setSelectedProduct(product); setQuantity(1); }}
                >
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-white/60 shadow-sm text-[11px] font-bold z-10">
                    <span className={`w-2 h-2 rounded-full relative ${product.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                      <span className={`absolute inset-0 rounded-full animate-pulse ${product.stock > 10 ? 'border border-emerald-500' : 'border border-amber-500'}`}></span>
                    </span>
                    <span className={product.stock > 10 ? 'text-emerald-700' : 'text-amber-700'}>
                      {product.stock > 10 ? `${product.stock} in stock` : `Only ${product.stock} left`}
                    </span>
                  </div>

                  <div className="h-48 p-4 flex items-center justify-center relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full absolute blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-0 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-400 w-full h-full flex items-center justify-center">
                      {productImages[product.id] ? (
                        <img
                          src={productImages[product.id]}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain drop-shadow-xl"
                        />
                      ) : (
                        <>
                          {product.shape === 'kit' && <PlusCircle size={64} className="text-blue-600 drop-shadow-lg" />}
                          {product.shape === 'mask' && <div className="w-32 h-16 bg-white rounded-2xl shadow-lg border border-blue-100" />}
                          {product.shape === 'glove' && <div className="w-20 h-28 bg-white rounded-t-full shadow-lg border border-blue-100" />}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50/50 border border-blue-100/50 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-3">
                      <Tag size={12} />
                      {product.categoryLabel}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2">{product.name}</h3>
                    <div className="mb-3">
                      <span className="font-mono text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">SKU {product.sku}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">
                          {currentCurrency.symbol}{formatPrice(product.price)}
                        </span>
                        <span className="text-xs font-bold text-gray-400">{currentCurrency.code}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); onAddToCart(product, 1); onCheckout(); }}
                        className="flex-1 h-11 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all"
                      >
                        <ShoppingCart size={16} />
                        Quick Order
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="w-11 h-11 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Heart size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <button onClick={() => setSelectedProduct(null)} className="hover:text-blue-600 transition-colors">Products</button>
              <ChevronRight size={16} />
              <span>{selectedProduct.categoryLabel}</span>
              <ChevronRight size={16} />
              <span className="text-gray-800 font-medium">{selectedProduct.name}</span>
            </div>

            {/* Product Detail Card */}
            <div className="bg-white shadow-[8px_8px_16px_#e6e9ef,-8px_-8px_16px_#ffffff] p-6 md:p-8 rounded-[20px] border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left: Product Image */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-full h-80 flex items-center justify-center mb-6">
                    <div className="w-64 h-64 bg-blue-50 rounded-full absolute blur-3xl opacity-30"></div>
                    <div className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500 w-full h-full flex items-center justify-center">
                      {productImages[selectedProduct.id] ? (
                        <img
                          src={productImages[selectedProduct.id]}
                          alt={selectedProduct.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <>
                          {selectedProduct.shape === 'kit' && <PlusCircle size={160} className="text-blue-600" />}
                          {selectedProduct.shape === 'mask' && <div className="w-64 h-32 bg-white rounded-3xl shadow-xl border border-blue-50" />}
                          {selectedProduct.shape === 'glove' && <div className="w-40 h-56 bg-white rounded-t-full shadow-xl border border-blue-50" />}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="w-16 h-16 rounded-xl overflow-hidden bg-white border-2 border-blue-500 p-2 shadow-md flex items-center justify-center">
                      {productImages[selectedProduct.id] ? (
                        <img src={productImages[selectedProduct.id]} alt="Thumbnail" className="w-full h-full object-contain" />
                      ) : (
                        <>
                          {selectedProduct.shape === 'kit' && <PlusCircle size={32} className="text-blue-600 mx-auto" />}
                          {selectedProduct.shape === 'mask' && <div className="w-full h-4 bg-blue-100 rounded mt-4" />}
                          {selectedProduct.shape === 'glove' && <div className="w-6 h-8 bg-blue-100 rounded-t-full mx-auto mt-2" />}
                        </>
                      )}
                    </button>
                    {[1, 2].map(i => (
                      <button key={i} className="w-16 h-16 rounded-xl overflow-hidden bg-white border-2 border-transparent opacity-40 hover:opacity-100 p-2 transition-all">
                        <div className="w-full h-full bg-gray-100 rounded-lg"></div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Product Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">{selectedProduct.categoryLabel}</span>
                    <span className="text-[10px] text-gray-400 font-mono">SKU {selectedProduct.sku}</span>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 leading-tight">{selectedProduct.name}</h1>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-900">4.8</span>
                      <span className="text-gray-500 text-xs">(127 reviews)</span>
                    </div>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="font-medium text-sm">In Stock ({selectedProduct.stock} available)</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Price & Currency */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-blue-600">{currentCurrency.symbol}{formatPrice(selectedProduct.price)}</span>
                      <span className="text-sm text-gray-400 font-bold">{currentCurrency.code}</span>
                    </div>
                    <div className="flex gap-2">
                      {CURRENCIES.slice(0, 3).map(c => (
                        <button
                          key={c.code}
                          onClick={() => setCurrentCurrency(c)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${currentCurrency.code === c.code
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                            }`}
                        >
                          {c.symbol} {c.code}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="bg-gray-50 p-2 rounded-xl flex items-center gap-2 border border-gray-100">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-14 text-center font-bold bg-transparent border-none outline-none text-gray-800 text-lg"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => { onAddToCart(selectedProduct, quantity); setSelectedProduct(null); }}
                      className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={20} />
                      Add to Order
                    </button>

                    <button className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                      <Heart size={20} />
                    </button>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-4 gap-3 text-center pt-4">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <Truck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-[10px] font-bold text-gray-700">Free Ship</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                      <div className="text-[10px] font-bold text-gray-700">FDA Appr.</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <RefreshCcw className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <div className="text-[10px] font-bold text-gray-700">30-Day Ret.</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <Headphones className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                      <div className="text-[10px] font-bold text-gray-700">24/7 Supp.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex gap-1 mb-6 bg-gray-50 p-1.5 rounded-xl w-fit">
                  {['specs', 'contents', 'usage', 'shipping'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === tab
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'specs' && (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid md:grid-cols-2 gap-8"
                    >
                      <div>
                        <h4 className="text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">Technical Specifications</h4>
                        <table className="w-full text-sm">
                          <tbody>
                            {[
                              { label: "SKU", value: selectedProduct.sku },
                              { label: "Category", value: selectedProduct.categoryLabel },
                              { label: "Weight", value: selectedProduct.weight },
                              { label: "Dimensions", value: selectedProduct.dimensions },
                              { label: "Shelf Life", value: selectedProduct.shelfLife },
                              { label: "Warranty", value: "2 Years" },
                            ].map((spec, i) => (
                              <tr key={i} className="border-b border-gray-50 last:border-0">
                                <td className="py-2.5 pr-4 font-bold text-gray-800 w-1/3">{spec.label}:</td>
                                <td className="py-2.5 text-gray-600">{spec.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">Key Features</h4>
                        <ul className="space-y-3">
                          {selectedProduct.list.slice(0, 5).map((feature, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <CheckCircle2 size={12} />
                              </div>
                              <span className="text-sm text-gray-600 font-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'contents' && (
                    <motion.div
                      key="contents"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h4 className="text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">Kit Contents</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {selectedProduct.list.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                              <CheckCircle2 size={14} />
                            </div>
                            <span className="text-xs text-gray-700 font-bold">{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'usage' && (
                    <motion.div
                      key="usage"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                        <p className="text-sm text-blue-800 leading-relaxed font-medium">
                          Always follow medical guidelines and consult a healthcare professional for proper use in emergency situations.
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Usage Instructions</h4>
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">{selectedProduct.usage}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Dosage / Application</h4>
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">{selectedProduct.dosage}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'shipping' && (
                    <motion.div
                      key="shipping"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid md:grid-cols-2 gap-8 text-sm"
                    >
                      <div>
                        <h4 className="text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">Shipping Options</h4>
                        <div className="space-y-3">
                          {[
                            { icon: Package, title: "Standard Shipping", desc: "5-7 business days • Free over $100", color: "text-blue-600", bg: "bg-gray-50" },
                            { icon: Zap, title: "Express Shipping", desc: "2-3 business days • $15.99", color: "text-blue-600", bg: "bg-gray-50" },
                            { icon: Truck, title: "Critical/Emergency", desc: "Next business day • $29.99", color: "text-blue-600", bg: "bg-blue-50 border border-blue-100" },
                          ].map((opt, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${opt.bg}`}>
                              <opt.icon className={`w-5 h-5 ${opt.color}`} />
                              <div>
                                <div className="font-bold text-gray-800">{opt.title}</div>
                                <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{opt.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">Storage Requirements</h4>
                        <div className="space-y-4 text-gray-600">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400"><Plus size={18} /></div>
                            <span className="font-medium">{selectedProduct.storage}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400"><ShieldCheck size={18} /></div>
                            <span className="font-medium">Keep out of reach of children</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CatalogView;
