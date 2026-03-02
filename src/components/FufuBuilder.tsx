import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShoppingBag, Check, Flame } from 'lucide-react';
import { CartItem } from '../types';

interface FufuBuilderProps {
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  initialProtein?: string;
}

const STEPS = ['Fufu', 'Légumes', 'Protéine', 'Sauce'];

const VEGETABLES = [
  { id: 'sombe', name: 'Sombe', desc: 'Feuilles de Manioc', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80' },
  { id: 'biteku', name: 'Biteku-teku', desc: 'Amaranthe', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=150&q=80' },
  { id: 'kalembula', name: 'Kalembula', desc: 'Feuilles de patate douce', image: 'https://images.unsplash.com/photo-1596644400799-106f23f05f77?auto=format&fit=crop&w=150&q=80' },
];

const PROTEINS = [
  { id: 'poulet', name: 'Poulet Mayo', price: 8000, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=200&q=80' },
  { id: 'ntaba', name: 'Ntaba (Chèvre)', price: 12000, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80' },
  { id: 'poisson', name: 'Poisson Braisé', price: 10000, image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=200&q=80' },
];

export default function FufuBuilder({ onClose, onAddToCart, initialProtein = 'poulet' }: FufuBuilderProps) {
  const [step, setStep] = useState(0);
  
  // Selections
  const [fufuCount, setFufuCount] = useState(2);
  const [selectedVeg, setSelectedVeg] = useState('sombe');
  const [selectedProtein, setSelectedProtein] = useState(initialProtein);
  const [chiliLevel, setChiliLevel] = useState(2); // 0 to 4

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else {
      const customFufu: CartItem = {
        id: `fufu-${Date.now()}`,
        name: `Fufu ${PROTEINS.find(p => p.id === selectedProtein)?.name}`,
        desc: `${fufuCount} boules, ${VEGETABLES.find(v => v.id === selectedVeg)?.name}, Pili-Pili ${chiliLevel}`,
        price: fufuCount * 1000 + (PROTEINS.find(p => p.id === selectedProtein)?.price || 0),
        quantity: 1,
        image: PROTEINS.find(p => p.id === selectedProtein)?.image || ''
      };
      onAddToCart(customFufu);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
    else onClose();
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between w-full max-w-[280px] mx-auto mb-4 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10"></div>
      <motion.div 
        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-miam-green rounded-full -z-10"
        initial={{ width: '0%' }}
        animate={{ width: `${(step / 3) * 100}%` }}
        transition={{ duration: 0.3 }}
      />
      {STEPS.map((s, i) => (
        <div key={s} className="flex flex-col items-center gap-1">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
            i <= step ? 'bg-miam-green text-white shadow-md' : 'bg-white text-gray-400 border-2 border-gray-200'
          }`}>
            {i + 1}
          </div>
          <span className={`text-[9px] uppercase tracking-wider font-semibold ${
            i === step ? 'text-miam-green' : 'text-gray-400'
          }`}>
            {s}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-miam-bg-malewa relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 z-10">
        <button onClick={prevStep} className="p-2 bg-white rounded-full shadow-sm text-gray-800 hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-bold text-lg text-gray-900">Fufu Builder</h2>
        <button className="p-2 bg-white rounded-full shadow-sm text-gray-800 relative hover:bg-gray-50 transition-colors">
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>

      {renderStepIndicator()}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 hide-scrollbar relative z-10 flex flex-col">
        
        {/* Controls Area (Moved to Top) */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 relative z-20 mb-4">
          <AnimatePresence mode="wait">
            {/* STEP 0: FUFU */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-1">Choisissez votre base</h3>
                <p className="text-xs text-gray-500 mb-4">Fufu de maïs traditionnel, onctueux et chaud.</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-gray-700 text-sm">Quantité (Boules)</span>
                  <span className="bg-miam-mint text-miam-green px-3 py-1 rounded-full text-xs font-bold">
                    {fufuCount} Boules
                  </span>
                </div>
                
                <input 
                  type="range" 
                  min="1" 
                  max="4" 
                  value={fufuCount} 
                  onChange={(e) => setFufuCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-miam-green mb-2"
                />
                <div className="flex justify-between text-xs text-gray-400 font-medium px-1">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                </div>
              </motion.div>
            )}

            {/* STEP 1: VEGETABLES */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-1">Le Lit (Légumes)</h3>
                <p className="text-xs text-gray-500 mb-4">Choisissez votre accompagnement végétal.</p>
                
                <div className="grid grid-cols-3 gap-3">
                  {VEGETABLES.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVeg(v.id)}
                      className={`flex flex-col items-center p-2 rounded-2xl border-2 transition-all ${
                        selectedVeg === v.id 
                          ? 'border-miam-green bg-miam-mint/20 shadow-md' 
                          : 'border-transparent bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden mb-2 shadow-sm">
                        <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-900 text-center leading-tight">{v.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: PROTEIN */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-1">La Protéine</h3>
                <p className="text-xs text-gray-500 mb-4">La star de votre assiette en HD.</p>
                
                <div className="flex flex-col gap-3">
                  {PROTEINS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProtein(p.id)}
                      className={`flex items-center p-2 rounded-2xl border-2 transition-all ${
                        selectedProtein === p.id 
                          ? 'border-miam-green bg-miam-mint/10 shadow-md' 
                          : 'border-transparent bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden mr-3 shadow-sm">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="block font-bold text-gray-900 text-sm">{p.name}</span>
                        <span className="text-xs text-miam-green font-semibold">{p.price.toLocaleString()} FC</span>
                      </div>
                      {selectedProtein === p.id && (
                        <div className="w-6 h-6 rounded-full bg-miam-green text-white flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: SAUCE & CHILI */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-1">Touche Finale</h3>
                <p className="text-xs text-gray-500 mb-4">Sublimez avec la sauce et le piment.</p>
                
                <div className="mb-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                      <Flame className={`w-4 h-4 ${chiliLevel > 2 ? 'text-red-500' : 'text-orange-400'}`} />
                      Pili-Pili
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      chiliLevel === 0 ? 'bg-gray-200 text-gray-600' :
                      chiliLevel === 1 ? 'bg-orange-100 text-orange-600' :
                      chiliLevel === 2 ? 'bg-orange-200 text-orange-700' :
                      chiliLevel === 3 ? 'bg-red-100 text-red-600' :
                      'bg-red-500 text-white animate-pulse'
                    }`}>
                      {chiliLevel === 0 ? 'Doux' : chiliLevel === 1 ? 'Léger' : chiliLevel === 2 ? 'Moyen' : chiliLevel === 3 ? 'Fort' : 'Moto-Moto 🔥'}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="4" 
                    value={chiliLevel} 
                    onChange={(e) => setChiliLevel(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 bg-amber-50 rounded-2xl p-3 border-2 border-amber-200 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-amber-100 rounded-bl-full -z-10"></div>
                    <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center text-xl mb-2 shadow-sm">
                      🥜
                    </div>
                    <span className="font-bold text-gray-900 mb-0.5 text-sm">Sauce Moambe</span>
                    <span className="text-[10px] text-gray-600">Onctueuse & riche</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Visual Plate Area (Moved to Bottom) */}
        <div className="relative w-full aspect-square max-w-[220px] mx-auto mt-auto flex items-center justify-center">
          {/* Plate Base */}
          <div className="absolute inset-0 rounded-full bg-white shadow-xl border-4 border-gray-50"></div>
          <div className="absolute inset-3 rounded-full bg-gray-50 shadow-inner"></div>

          {/* Dynamic Food Elements based on state */}
          <AnimatePresence>
            {/* Fufu Balls */}
            {Array.from({ length: fufuCount }).map((_, i) => (
              <motion.div
                key={`fufu-${i}`}
                initial={{ y: -150, opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: i === 0 ? -20 : (i === 1 ? 20 : (i === 2 ? 0 : -8)),
                  y: i === 2 ? 25 : (i === 3 ? -25 : 0)
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", bounce: 0.4, delay: i * 0.15 }}
                className="absolute w-20 h-20 bg-[#FFF8DC] rounded-full shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.1)] drop-shadow-lg z-20 flex items-center justify-center"
                style={{
                  marginLeft: i === 0 ? '-20px' : (i === 1 ? '20px' : '0'),
                  marginTop: i === 2 ? '30px' : '0'
                }}
              >
                {/* Steam animation */}
                <motion.div
                  animate={{ y: [-5, -15], opacity: [0, 0.5, 0], scale: [1, 1.2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute -top-3 w-4 h-8 bg-white/40 blur-md rounded-full"
                />
              </motion.div>
            ))}

            {/* Vegetables */}
            {step >= 1 && (
              <motion.div
                key="veg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 w-24 h-24 bg-green-800/80 rounded-full blur-[3px] z-10"
              />
            )}

            {/* Protein */}
            {step >= 2 && (
              <motion.img
                key="protein"
                src={PROTEINS.find(p => p.id === selectedProtein)?.image}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute bottom-2 left-2 w-28 h-28 object-cover rounded-full shadow-2xl z-30 cutout-img"
              />
            )}

            {/* Sauce/Chili */}
            {step >= 3 && chiliLevel > 0 && (
              <motion.div
                key="sauce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 + (chiliLevel * 0.1) }}
                className="absolute inset-4 rounded-full bg-red-600/50 blur-xl z-40 mix-blend-multiply pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Action */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] z-50">
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Total Estimé</span>
          <span className="text-2xl font-bold text-miam-green">
            {(fufuCount * 1000 + (PROTEINS.find(p => p.id === selectedProtein)?.price || 0)).toLocaleString()} FC
          </span>
        </div>
        <button 
          onClick={nextStep}
          className="w-full bg-miam-green text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-miam-green/30 hover:bg-opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {step < 3 ? 'Continuer' : 'Ajouter au panier'}
        </button>
      </div>
    </div>
  );
}

