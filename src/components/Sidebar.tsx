import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  PieChart, 
  Package, 
  Layers, 
  Tag,
  FileText,
  Beaker,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Order', icon: ShoppingCart },
    { id: 'statistic', label: 'Statistic', icon: PieChart },
    { id: 'catalog', label: 'Product', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: Layers },
    { id: 'drafts', label: 'Drafts', icon: FileText },
    { id: 'laboratory', label: 'Laboratory', icon: Beaker },
    { id: 'admin', label: 'Offer', icon: Tag },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      className="sidebar relative"
    >
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-[#009ADE] text-xl shadow-lg">
          eP
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-4 font-black text-xl text-white tracking-tight"
            >
              eProduct
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center h-12 rounded-xl transition-all duration-300 group relative
                ${isActive 
                  ? 'bg-white text-[#009ADE] shadow-lg font-bold' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }
                ${!isOpen ? 'justify-center' : 'px-4 gap-4'}
              `}
            >
              <Icon size={20} className={`${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {!isOpen && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-[#1A2B4A] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap shadow-xl border border-white/10">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <button className={`w-full flex items-center h-10 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all ${!isOpen ? 'justify-center' : 'px-4 gap-4'}`}>
          <Settings size={18} />
          {isOpen && <span className="text-sm font-bold">Settings</span>}
        </button>
        <button className={`w-full flex items-center h-10 rounded-lg text-red-300 hover:text-red-100 hover:bg-red-500/20 transition-all ${!isOpen ? 'justify-center' : 'px-4 gap-4'}`}>
          <LogOut size={18} />
          {isOpen && <span className="text-sm font-bold">Sign Out</span>}
        </button>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-24 w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#009ADE] shadow-md border border-gray-100 hover:scale-110 transition-transform z-50"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </motion.aside>
  );
};

export default Sidebar;
