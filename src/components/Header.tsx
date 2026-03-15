import React from 'react';
import { Search, Bell } from 'lucide-react';
import '../styles/Header.css';

interface HeaderProps {
  currentUser: {
    name: string;
    role: string;
    country?: string;
  };
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onProfileSettings: () => void;
  onOrderClick: (orderId: string) => void;
}

function Header({ currentUser, activeTab, setActiveTab, onLogout, onProfileSettings, onOrderClick }: HeaderProps) {
  const getTitle = (tab: string) => {
    switch(tab) {
      case 'dashboard': return 'Dashboard';
      case 'orders': return 'Order';
      case 'statistic': return 'Statistic';
      case 'catalog': return 'Product';
      case 'osl-operations': return 'Stock';
      case 'admin': return 'Offer';
      default: return tab.charAt(0).toUpperCase() + tab.slice(1);
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="page-title">{getTitle(activeTab)}</h1>
        <p className="page-subtitle">28 orders found</p>
      </div>

      <div className="header-right">
        <button className="header-icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <button className="header-icon-btn">
          <Search size={20} />
        </button>
        <div className="user-profile" onClick={onProfileSettings}>
          <div className="profile-avatar">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
