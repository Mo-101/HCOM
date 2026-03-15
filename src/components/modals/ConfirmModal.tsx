import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmVariant?: 'danger' | 'primary' | 'warning';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmLabel = 'Confirm',
  confirmVariant = 'primary'
}) => {
  if (!isOpen) return null;

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 shadow-blue-100',
    danger: 'bg-rose-600 hover:bg-rose-700 shadow-rose-100',
    warning: 'bg-orange-600 hover:bg-orange-700 shadow-orange-100'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
        >
          <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${confirmVariant === 'danger' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-lg font-black text-gray-800">{title}</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="p-8">
            <p className="text-gray-600 font-bold leading-relaxed">
              {message}
            </p>
          </div>

          <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 py-3 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg transition-all ${variantClasses[confirmVariant]}`}
            >
              {confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
