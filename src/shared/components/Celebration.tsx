import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Award, Sparkles } from 'lucide-react';

interface CelebrationProps {
  isVisible: boolean;
  type: 'BADGE' | 'LEVEL_UP' | 'MILESTONE' | 'CHALLENGE';
  title: string;
  message: string;
  onClose: () => void;
}

export const Celebration = ({ isVisible, type, title, message, onClose }: CelebrationProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'BADGE':
        return <Award className="w-16 h-16 text-yellow-400" />;
      case 'LEVEL_UP':
        return <Trophy className="w-16 h-16 text-purple-400" />;
      case 'MILESTONE':
        return <Star className="w-16 h-16 text-indigo-400" />;
      case 'CHALLENGE':
        return <Zap className="w-16 h-16 text-amber-400" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'BADGE':
        return 'from-yellow-400 to-orange-500';
      case 'LEVEL_UP':
        return 'from-purple-400 to-pink-500';
      case 'MILESTONE':
        return 'from-indigo-400 to-blue-500';
      case 'CHALLENGE':
        return 'from-amber-400 to-yellow-500';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={onClose}
          >
            {/* Confetti Effect */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  rotate: 0,
                  opacity: 1 
                }}
                animate={{
                  x: (Math.random() - 0.5) * 1000,
                  y: (Math.random() - 0.5) * 1000,
                  rotate: Math.random() * 360,
                  opacity: 0,
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899', '#a855f7', '#6366f1'][Math.floor(Math.random() * 6)],
                }}
              />
            ))}

            {/* Celebration Card */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className={`bg-gradient-to-br ${getColors()} p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden max-w-md w-full mx-4`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sparkle Effects */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute top-4 right-4"
              >
                <Sparkles className="w-8 h-8 text-white/80" />
              </motion.div>

              <div className="text-center relative z-10">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="mb-4 flex justify-center"
                >
                  {getIcon()}
                </motion.div>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mb-2"
                >
                  {title}
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg opacity-90 mb-6"
                >
                  {message}
                </motion.p>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={onClose}
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-colors border border-white/30"
                >
                  Awesome!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Hook for easy celebration triggering
export const useCelebration = () => {
  const [celebration, setCelebration] = useState<{
    isVisible: boolean;
    type: 'BADGE' | 'LEVEL_UP' | 'MILESTONE' | 'CHALLENGE';
    title: string;
    message: string;
  }>({
    isVisible: false,
    type: 'BADGE',
    title: '',
    message: '',
  });

  const triggerCelebration = (
    type: 'BADGE' | 'LEVEL_UP' | 'MILESTONE' | 'CHALLENGE',
    title: string,
    message: string
  ) => {
    setCelebration({ isVisible: true, type, title, message });
  };

  const closeCelebration = () => {
    setCelebration(prev => ({ ...prev, isVisible: false }));
  };

  return {
    celebration,
    triggerCelebration,
    closeCelebration,
  };
};
