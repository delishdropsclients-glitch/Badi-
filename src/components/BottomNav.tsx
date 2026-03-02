import React from 'react';
import { motion } from 'motion/react';
import { Home, Heart, ShoppingBag, User } from 'lucide-react';
import { AppTheme } from '../types';

interface BottomNavProps {
  theme: AppTheme;
  onToggleTheme: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenVideos: () => void;
  onOpenProfile: () => void;
  onHome: () => void;
}

export default function BottomNav({ theme, onToggleTheme, cartCount, onOpenCart, onOpenVideos, onOpenProfile, onHome }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 w-full px-6 pb-6 pt-4 bg-gradient-to-t from-white via-white to-transparent pointer-events-none z-40">
      <div className="bg-[#111827] rounded-full px-6 py-4 flex justify-between items-center shadow-2xl pointer-events-auto relative">
        <button onClick={onHome} className="text-white transition-colors">
          <Home className="w-6 h-6" />
        </button>
        <button onClick={onOpenVideos} className="text-gray-400 hover:text-white transition-colors mr-8">
          <Heart className="w-6 h-6" />
        </button>
        
        {/* FAB - Malewa Toggle */}
        <button 
          onClick={onToggleTheme}
          className="absolute left-1/2 -translate-x-1/2 -top-8 w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center p-1.5 transition-transform hover:scale-105 active:scale-95"
        >
          <motion.div
            animate={{ 
              backgroundColor: theme === 'malewa' ? '#D4A373' : '#1B4332',
              rotate: theme === 'malewa' ? 360 : 0 
            }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-full h-full rounded-full flex items-center justify-center text-white shadow-inner relative overflow-hidden"
          >
            {/* Traditional Pot Icon (SVG) */}
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-8 h-8 relative z-10"
            >
              <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
              <line x1="6" y1="17" x2="18" y2="17"/>
              <path d="M10 9h4"/>
              <path d="M12 2v2"/>
            </svg>
            
            {/* Steam animation when in malewa mode */}
            {theme === 'malewa' && (
              <motion.div
                animate={{ y: [-5, -15], opacity: [0, 0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-2 w-4 h-6 bg-white/30 blur-sm rounded-full"
              />
            )}
          </motion.div>
          
          {/* Notification dot */}
          {theme === 'standard' && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
          )}
        </button>

        <button onClick={onOpenCart} className="text-gray-400 hover:text-white transition-colors ml-8 relative">
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-miam-green text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-[#111827]">
              {cartCount}
            </span>
          )}
        </button>
        <button onClick={onOpenProfile} className="text-gray-400 hover:text-white transition-colors">
          <User className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
