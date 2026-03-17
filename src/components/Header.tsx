import React from 'react';
import { Search, Bell, Menu, X, Filter } from 'lucide-react';
import { User } from '../types';
import { motion } from 'motion/react';

interface HeaderProps {
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onProfileSettings: () => void;
  onOrderClick: (orderId: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

function Header({ 
  currentUser, 
  activeTab, 
  setActiveTab, 
  onLogout, 
  onProfileSettings, 
  onOrderClick,
  isSidebarOpen,
  setIsSidebarOpen
}: HeaderProps) {
  const getTitle = (tab: string) => {
    switch(tab) {
      case 'dashboard': return 'Dashboard';
      case 'orders': return 'Order Management';
      case 'statistic': return 'Analytics';
      case 'catalog': return 'Product Catalog';
      case 'inventory': return 'Inventory Control';
      case 'drafts': return 'Draft Documents';
      case 'laboratory': return 'Lab Analysis';
      case 'admin': return 'Special Offers';
      default: return tab.charAt(0).toUpperCase() + tab.slice(1);
    }
  };

  return (
    <header className="header">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className="flex flex-col">
          <motion.h1 
            key={activeTab}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black text-white tracking-tight"
          >
            {getTitle(activeTab)}
          </motion.h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">System Online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-12 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search products, orders, or analytics..." 
            className="w-full h-12 bg-white/10 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/20 focus:border-white/30 transition-all font-medium"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/40 hover:text-white transition-colors">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 ml-auto">
        <div className="flex items-center gap-2">
          <button className="relative p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all group">
            <Bell size={22} />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1A2B4A] group-hover:scale-110 transition-transform"></span>
          </button>
        </div>

        <div 
          onClick={onProfileSettings}
          className="flex items-center gap-4 pl-6 border-l border-white/10 cursor-pointer group"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-white leading-none">{currentUser.name}</p>
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">{currentUser.role}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-white shadow-lg group-hover:bg-white group-hover:text-[#009ADE] transition-all duration-300">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
