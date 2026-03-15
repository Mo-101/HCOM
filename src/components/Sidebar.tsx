import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  PieChart, 
  Package, 
  Layers, 
  Tag 
} from 'lucide-react';
import '../styles/Sidebar.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Order', icon: ShoppingCart },
    { id: 'statistic', label: 'Statistic', icon: PieChart },
    { id: 'catalog', label: 'Product', icon: Package },
    { id: 'inventory', label: 'Stock', icon: Layers },
    { id: 'admin', label: 'Offer', icon: Tag },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span>eProduct</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Google</a>
      </div>
    </div>
  );
};

export default Sidebar;
