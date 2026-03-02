import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface SuccessScreenProps {
  onContinue: () => void;
  onTrack: () => void;
}

export default function SuccessScreen({ onContinue, onTrack }: SuccessScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-white p-6 text-center">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-32 h-32 bg-miam-mint rounded-full flex items-center justify-center mb-8 relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 bg-miam-green rounded-full flex items-center justify-center"
          >
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-gray-900 mb-4"
        >
          Merci d'utiliser l'application.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mb-2"
        >
          C'est un grand plaisir de vous avoir servi.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-gray-600 mb-2"
        >
          Vous pouvez continuer vos commandes ou revenir la prochaine fois.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-gray-600 mb-12 font-medium"
        >
          N'oubliez pas d'en parler à un ami !
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="w-full flex flex-col gap-4 mt-auto pb-8"
      >
        <button 
          onClick={onTrack}
          className="w-full bg-miam-green text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-miam-green/30 hover:bg-opacity-90 transition-all active:scale-95"
        >
          Suivre ma commande
        </button>
        <button 
          onClick={onContinue}
          className="w-full bg-gray-100 text-gray-900 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all active:scale-95"
        >
          Retour à l'accueil
        </button>
      </motion.div>
    </div>
  );
}
