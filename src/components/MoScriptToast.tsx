import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, X, Zap } from 'lucide-react';

interface MoScriptLog {
  id: string;
  msg: string;
  time: string;
  type?: 'info' | 'success' | 'warning';
}

interface MoScriptToastProps {
  logs: MoScriptLog[];
  onClear: () => void;
}

const MoScriptToast: React.FC<MoScriptToastProps> = ({ logs, onClear }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (logs.length > 0) {
      setIsVisible(true);
      // Auto-hide after some time if no new logs? 
      // Or keep it visible if there are recent logs.
    }
  }, [logs]);

  if (logs.length === 0) return null;

  const latestLog = logs[0];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          className="fixed bottom-8 left-8 z-[100] w-80"
        >
          <div className="bg-[#e6e9ef] rounded-[32px] p-6 shadow-[12px_12px_24px_#c8cbd0,-12px_-12px_24px_#ffffff] border border-white/50 relative overflow-hidden group">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-emerald-400 shadow-lg">
                    <Terminal size={16} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">MoScript AI</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Core Active</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="p-1.5 hover:bg-gray-200 rounded-full text-gray-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="bg-black/90 rounded-2xl p-4 font-mono text-[10px] text-emerald-400 shadow-inner border border-emerald-900/30 min-h-[80px] flex flex-col justify-center">
                <div className="flex gap-2 mb-1 opacity-40">
                  <span>[{latestLog.time}]</span>
                  <span>ID:{latestLog.id.slice(-4)}</span>
                </div>
                <div className="leading-relaxed">
                  <span className="text-emerald-500 mr-1 font-black">{">"}</span>
                  {latestLog.msg}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-5 h-5 rounded-full border-2 border-[#e6e9ef] bg-gray-200 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-50" />
                    </div>
                  ))}
                  <div className="w-5 h-5 rounded-full border-2 border-[#e6e9ef] bg-white flex items-center justify-center text-[8px] font-black text-gray-400">
                    +{logs.length}
                  </div>
                </div>
                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <Cpu size={10} />
                  v2.4.0-stable
                </div>
              </div>
            </div>

            {/* Background Zap Icon */}
            <Zap size={80} className="absolute -bottom-4 -right-4 text-emerald-500/5 rotate-12" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoScriptToast;
