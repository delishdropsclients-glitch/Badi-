import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, UtensilsCrossed, MoreVertical } from 'lucide-react';

interface MalewaHomeProps {
  onStartBuilder: () => void;
}

export default function MalewaHome({ onStartBuilder }: MalewaHomeProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-[#FCF9F2]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full bg-[#D4A373] blur-[80px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-80 h-80 rounded-full bg-[#E9C46A] blur-[80px]"></div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1B4332 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      </div>

      {/* Header */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
        <button className="p-2 text-miam-green hover:bg-miam-earth/10 rounded-full transition-colors">
          <ArrowRight className="w-6 h-6 rotate-180" />
        </button>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-miam-earth/30 text-miam-earth font-bold text-xs tracking-widest shadow-sm">
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span>MODE MALEWA</span>
        </div>
        <button className="p-2 text-miam-green hover:bg-miam-earth/10 rounded-full transition-colors">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="z-10 flex flex-col items-center w-full mt-12"
      >
        <h1 className="text-5xl font-bold text-miam-green mb-4 leading-tight font-serif tracking-tight">
          Bienvenue<br />
          <span className="text-miam-earth">au Malewa</span>
        </h1>
        
        <p className="text-gray-600 mb-12 max-w-[280px] text-sm leading-relaxed">
          Composez votre plat traditionnel étape par étape.
        </p>

        {/* Central Graphic */}
        <div className="relative w-72 h-72 mb-16">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[1px] border-miam-earth/20"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border-[1px] border-dashed border-miam-earth/40"
          />
          <div className="absolute inset-8 rounded-full bg-white shadow-2xl flex items-center justify-center p-2">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80" 
                alt="Traditional Food" 
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
          
          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center text-2xl border border-white"
          >
            🥣
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-12 -left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center text-xl border border-white"
          >
            🥬
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartBuilder}
          className="bg-miam-green text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-miam-green/20 flex items-center justify-between w-full max-w-[320px]"
        >
          <span>COMMENCER MON FUFU</span>
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <ArrowRight className="w-5 h-5" />
          </div>
        </motion.button>
        
        <p className="text-xs text-gray-400 mt-6 text-center max-w-[250px]">
          Une expérience culinaire authentique par miam.services
        </p>
      </motion.div>
    </div>
  );
}
