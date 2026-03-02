import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Star, ChevronLeft } from 'lucide-react';

interface OrderTrackingProps {
  onHome: () => void;
}

export default function OrderTracking({ onHome }: OrderTrackingProps) {
  return (
    <div className="h-full flex flex-col bg-gray-50 relative overflow-hidden">
      {/* Map Background Placeholder */}
      <div className="absolute inset-0 z-0 bg-[#E5E7EB] opacity-50" style={{ backgroundImage: 'radial-gradient(#9CA3AF 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        {/* Animated Route Line */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.path 
            d="M 50 100 Q 150 200 200 400 T 350 600" 
            fill="none" 
            stroke="#1B4332" 
            strokeWidth="4" 
            strokeDasharray="10 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.circle 
            cx="350" cy="600" r="8" fill="#1B4332"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3 }}
          />
          <motion.circle 
            cx="50" cy="100" r="8" fill="#D4A373"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        </svg>
      </div>

      <div className="absolute top-6 left-6 z-10">
        <button onClick={onHome} className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Card */}
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.5 }}
        className="absolute bottom-0 left-0 w-full bg-white rounded-t-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)] p-6 z-20"
      >
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">En route</h2>
            <p className="text-gray-500 font-medium">Arrivée prévue à <span className="text-miam-green font-bold">13:45</span></p>
          </div>
          <div className="bg-miam-mint/50 px-4 py-2 rounded-full text-miam-green font-bold text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-miam-green animate-pulse"></span>
            Livraison
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 mb-6 border border-gray-100">
          <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden relative">
            <img src="https://i.pravatar.cc/150?img=11" alt="Driver" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
              <div className="bg-miam-green text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                <Star className="w-3 h-3 fill-current" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">Jean Dupont</h3>
            <p className="text-xs text-gray-500">Votre livreur miam</p>
          </div>
          <button className="w-12 h-12 rounded-full bg-miam-green text-white flex items-center justify-center shadow-md hover:bg-opacity-90 transition-colors">
            <Phone className="w-5 h-5 fill-current" />
          </button>
        </div>

        <div className="relative pl-6 border-l-2 border-gray-100 ml-3 space-y-6 mb-8">
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-miam-green border-4 border-white shadow-sm"></div>
            <h4 className="font-bold text-gray-900 text-sm">Restaurant / Malewa</h4>
            <p className="text-xs text-gray-500 mt-1">Commande récupérée - 13:20</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-miam-green shadow-sm"></div>
            <h4 className="font-bold text-gray-900 text-sm">143, Avenue des Champs</h4>
            <p className="text-xs text-gray-500 mt-1">Gombe, Kinshasa</p>
          </div>
        </div>

        <button onClick={onHome} className="w-full bg-gray-900 text-white py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-800 transition-all active:scale-95">
          Retour à l'accueil
        </button>
      </motion.div>
    </div>
  );
}
