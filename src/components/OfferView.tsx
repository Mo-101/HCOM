import React from 'react';
import { motion } from 'motion/react';
import { Tag, Zap, Clock, ArrowRight, Star, ShieldCheck, Percent } from 'lucide-react';

const OfferView: React.FC = () => {
  const offers = [
    {
      id: 1,
      title: 'Emergency Response Bundle',
      desc: 'Complete set of IEHK 2017 kits with 15% discount for rapid deployment.',
      discount: '15% OFF',
      expiry: '24h left',
      items: ['IEHK Basic', 'IEHK Supplementary', 'Trauma Kit'],
      color: 'bg-blue-600'
    },
    {
      id: 2,
      title: 'PPE Bulk Procurement',
      desc: 'High-volume discount for N95 masks and Nitrile gloves.',
      discount: '20% OFF',
      expiry: '3 days left',
      items: ['N95 Masks', 'Nitrile Gloves', 'Coveralls'],
      color: 'bg-emerald-600'
    },
    {
      id: 3,
      title: 'Diagnostic Kit Special',
      desc: 'New generation rapid diagnostic tests for malaria and cholera.',
      discount: '10% OFF',
      expiry: '7 days left',
      items: ['Malaria RDT', 'Cholera RDT'],
      color: 'bg-purple-600'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-gray-800">Special Offers</h2>
          <p className="text-gray-500 font-medium">Exclusive procurement bundles and time-limited discounts.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 font-bold text-sm">
          <Zap size={16} />
          <span>Flash Deals Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <motion.div 
            key={offer.id}
            whileHover={{ y: -10 }}
            className="bg-white rounded-[32px] shadow-[12px_12px_24px_#e6e9ef,-12px_-12px_24px_#ffffff] border border-white/50 overflow-hidden flex flex-col"
          >
            <div className={`${offer.color} p-6 text-white relative overflow-hidden`}>
              <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                  <Tag size={24} />
                </div>
                <div className="px-3 py-1 bg-white text-gray-900 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {offer.discount}
                </div>
              </div>
              <h3 className="text-xl font-black leading-tight mb-2">{offer.title}</h3>
              <div className="flex items-center gap-2 text-[10px] font-bold opacity-80">
                <Clock size={12} />
                <span>EXPIRES IN: {offer.expiry}</span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6">
                {offer.desc}
              </p>
              
              <div className="space-y-3 mb-8">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Included Items</h4>
                {offer.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>

              <button className="mt-auto w-full py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-800 font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all group">
                View Bundle Details
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Loyalty Program Section */}
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-[40px] p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-400/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <Star size={12} className="text-amber-400" />
              Premium Partner Program
            </div>
            <h2 className="text-4xl font-black mb-4 leading-tight">Unlock Priority<br/>Fulfillment</h2>
            <p className="text-blue-100/70 font-medium mb-6 max-w-md">
              High-volume procurement partners get access to dedicated logistics rails, 
              zero-wait review processes, and exclusive pricing tiers.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-blue-900 rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-transform">
                Join Program
              </button>
              <button className="px-8 py-4 bg-blue-800/50 border border-blue-700 rounded-2xl font-black text-sm hover:bg-blue-800 transition-all">
                Learn More
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Avg. Savings', value: '24%', icon: Percent },
              { label: 'Priority Hubs', value: '12', icon: Zap },
              { label: 'Active Partners', value: '450+', icon: Star },
              { label: 'Global Reach', value: '190', icon: ShieldCheck },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                <stat.icon size={24} className="text-blue-400 mb-4" />
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-[10px] font-black text-blue-200 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OfferView;
