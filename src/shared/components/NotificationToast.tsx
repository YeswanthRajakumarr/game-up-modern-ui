import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell } from 'lucide-react';

interface NotificationToastProps {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'announcement';
  duration?: number;
  onClose?: () => void;
}

export const NotificationToast = ({ 
  title, 
  message, 
  type = 'info',
  duration = 5000,
  onClose 
}: NotificationToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getColors = () => {
    switch (type) {
      case 'announcement':
        return 'from-red-500 to-pink-600';
      case 'success':
        return 'from-emerald-500 to-teal-600';
      case 'warning':
        return 'from-amber-500 to-orange-600';
      default:
        return 'from-indigo-500 to-purple-600';
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 400, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 400, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-4 right-4 z-[10000] bg-gradient-to-r ${getColors()} text-white rounded-2xl shadow-2xl p-4 min-w-[320px] max-w-md border-2 border-white/20 backdrop-blur-sm`}
    >
      <div className="flex items-start gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <Bell className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose?.(), 300);
          }}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

// Global notification manager
export const useNotificationToast = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: number;
    title: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'announcement';
  }>>([]);

  const showNotification = (
    title: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'announcement' = 'info'
  ) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, message, type }]);
    return id;
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return { notifications, showNotification, removeNotification };
};
