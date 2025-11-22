import React, { useState } from 'react';
import { MOCK_REWARDS, MOCK_USERS } from '../../../shared/mockData';
import type { Student, Reward } from '../../../shared/types';
import { Gift, History, Coins, Check } from 'lucide-react';
import { useAuth } from '../../global-context/AuthContext';
import { Icon3D, Icon3DEnhanced, FloatingIcon3D } from '../../../shared/components/Icon3D';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { Confetti } from '../../../shared/components/Confetti';
import { motion, AnimatePresence } from 'framer-motion';

export const RewardsPage = () => {
  const { user } = useAuth();
  
  // Mock balance for demo
  const [balance, setBalance] = useState(user?.role === 'STUDENT' ? (user as Student).wallet : 0);
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRedeem = (reward: Reward) => {
    if (balance >= reward.cost) {
      setBalance(prev => prev - reward.cost);
      setRedeemed(prev => [...prev, reward.id]);
      setSuccessMessage(`🎉 Successfully redeemed: ${reward.name}!`);
      
      // Trigger confetti with new key to force remount
      setConfettiKey(prev => prev + 1);
      setShowConfetti(true);
      
      // Clear success message after confetti animation
      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
    } else {
      alert("Not enough coins!");
    }
  };

  if (user?.role !== 'STUDENT') {
      return (
          <div className="text-center py-20">
              <Icon3DImage type="gift" size={80} float={true} />
              <h2 className="text-xl font-bold text-slate-700 mt-4">Rewards Store</h2>
              <p className="text-slate-500">Only students can access the rewards store.</p>
          </div>
      );
  }

  return (
    <div className="space-y-8">
      <Confetti key={confettiKey} trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      {/* Success Message Toast */}
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[10000]"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/20 backdrop-blur-sm">
              <Icon3DImage type="gift" size={32} />
              <span className="font-bold text-lg">{successMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Rewards Store</h1>
            <p className="text-slate-500">Spend your hard-earned coins!</p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 animate-pulse">
             <div className="bg-white/20 p-2 rounded-full">
                 <FloatingIcon3D 
                   icon={Coins} 
                   size={24}
                   color="#ffffff"
                   float={true}
                 />
             </div>
             <div>
                 <div className="text-xs font-bold text-yellow-100 uppercase tracking-wider">My Balance</div>
                 <div className="text-2xl font-bold">{balance} Coins</div>
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_REWARDS.map(reward => (
              <div key={reward.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                       {/* Placeholder for Image */}
                       <Icon3DImage 
                         type="gift" 
                         size={64}
                         className="group-hover:scale-110 transition-transform duration-300"
                       />
                       <div className="absolute top-3 right-3 bg-slate-900/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-600">
                           {reward.type}
                       </div>
                  </div>
                  <div className="p-6">
                      <h3 className="font-bold text-lg text-slate-800 mb-2">{reward.name}</h3>
                      <div className="flex items-center justify-between mt-4">
                          <div className="text-amber-500 font-bold text-lg flex items-center gap-1">
                              <Icon3DEnhanced 
                                icon={Coins} 
                                size={16}
                                gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                                glow={true}
                                glowColor="#f59e0b"
                              />
                              {reward.cost}
                          </div>
                          <button 
                            onClick={() => handleRedeem(reward)}
                            disabled={balance < reward.cost}
                            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                                balance >= reward.cost 
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20' 
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                              Redeem
                          </button>
                      </div>
                  </div>
              </div>
          ))}
      </div>

      {/* Recent History */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Icon3D 
                icon={History} 
                size={20}
                color="#94a3b8"
                depth={4}
              />
              Redemption History
          </h3>
          {redeemed.length > 0 ? (
              <div className="space-y-3">
                  {redeemed.map((id, index) => {
                      const item = MOCK_REWARDS.find(r => r.id === id);
                      return (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                  <div className="bg-green-100 p-2 rounded-full">
                                      <Icon3DEnhanced 
                                        icon={Check} 
                                        size={16}
                                        gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                                        glow={true}
                                        glowColor="#10b981"
                                      />
                                  </div>
                                  <span className="font-medium text-slate-700">{item?.name}</span>
                              </div>
                              <span className="text-slate-500 text-sm font-medium">-{item?.cost} Coins</span>
                          </div>
                      );
                  })}
              </div>
          ) : (
              <p className="text-slate-400 text-sm">No items redeemed yet.</p>
          )}
      </div>
    </div>
  );
};
