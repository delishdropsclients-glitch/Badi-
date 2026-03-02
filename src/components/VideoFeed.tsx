import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, Music } from 'lucide-react';

export const FEED_ITEMS = [
  {
    id: 'v1',
    proteinId: 'poulet',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'Poulet Mayo Croustillant',
    restaurant: 'Chez Maman',
    desc: 'Le meilleur poulet mayo de Kinshasa, croustillant à souhait !',
    likes: '12.4K',
  },
  {
    id: 'v2',
    proteinId: 'ntaba',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'Ntaba Grillé',
    restaurant: 'Lolo Grill',
    desc: 'Viande de chèvre tendre et parfaitement épicée.',
    likes: '8.2K',
  },
  {
    id: 'v3',
    proteinId: 'poisson',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    title: 'Poisson Braisé',
    restaurant: 'La Marina',
    desc: 'Poisson frais du fleuve, braisé aux épices locales.',
    likes: '15.1K',
  }
];

interface VideoFeedProps {
  onSwitchToMalewa: (proteinId: string) => void;
}

export default function VideoFeed({ onSwitchToMalewa }: VideoFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const currentItem = FEED_ITEMS[currentIndex];

  const handleLike = () => {
    setLiked(true);
    setShowModal(true);
  };

  const handleNext = () => {
    if (!showModal) {
      setCurrentIndex((prev) => (prev + 1) % FEED_ITEMS.length);
      setLiked(false);
    }
  };

  const handlePrev = () => {
    if (!showModal) {
      setCurrentIndex((prev) => (prev - 1 + FEED_ITEMS.length) % FEED_ITEMS.length);
      setLiked(false);
    }
  };

  return (
    <div className="h-full w-full bg-black relative overflow-hidden">
      {/* Video/Image Container */}
      <motion.div 
        className="absolute inset-0 w-full h-full origin-center"
        animate={{ 
          scale: showModal ? 1.3 : 1,
          filter: showModal ? 'blur(8px) brightness(0.7)' : 'blur(0px) brightness(1)'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.video 
          key={currentItem.id}
          layoutId={`protein-image-${currentItem.proteinId}`}
          src={currentItem.video} 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
      </motion.div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 pb-28 pointer-events-none z-10">
        <div className="flex items-end justify-between w-full">
          {/* Info */}
          <div className="flex-1 pr-12 text-white">
            <h2 className="text-2xl font-bold mb-2 drop-shadow-md">{currentItem.restaurant}</h2>
            <p className="text-sm mb-3 opacity-90 drop-shadow-md">{currentItem.title} - {currentItem.desc}</p>
            <div className="flex items-center gap-2 text-xs bg-black/30 backdrop-blur-md w-max px-3 py-1.5 rounded-full border border-white/10">
              <Music className="w-3 h-3" />
              <span>Son original - miam.services</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-6 pointer-events-auto">
            <button 
              onClick={handleLike}
              className="flex flex-col items-center gap-1 group"
            >
              <motion.div 
                whileTap={{ scale: 0.8 }}
                className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-black/40 transition-colors"
              >
                <Heart className={`w-6 h-6 transition-colors ${liked ? 'fill-miam-green text-miam-green' : 'text-white'}`} />
              </motion.div>
              <span className="text-white text-xs font-medium drop-shadow-md">{currentItem.likes}</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <MessageCircle className="text-white w-6 h-6" />
              </div>
              <span className="text-white text-xs font-medium drop-shadow-md">1.2K</span>
            </button>

            <button className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <Share2 className="text-white w-6 h-6" />
              </div>
              <span className="text-white text-xs font-medium drop-shadow-md">Partager</span>
            </button>
          </div>
        </div>
      </div>

      {/* Swipe Controls (Invisible) */}
      <div className="absolute inset-0 z-0 flex flex-col">
        <div className="flex-1" onClick={handlePrev}></div>
        <div className="flex-1" onClick={handleNext}></div>
      </div>

      {/* Glassmorphism Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            className="absolute bottom-24 left-4 right-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 shadow-2xl z-50 flex flex-col items-center text-center"
          >
            <div className="w-12 h-1.5 bg-white/30 rounded-full mb-6"></div>
            <h3 className="text-3xl font-bold text-white mb-3 font-serif tracking-tight">Ce plat vous tente ?</h3>
            <p className="text-white/80 text-sm mb-8 leading-relaxed">
              Personnalisez-le avec vos accompagnements préférés et dégustez-le à la mode congolaise.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSwitchToMalewa(currentItem.proteinId)}
              className="w-full bg-miam-green text-white py-4 rounded-2xl font-bold text-lg shadow-[0_10px_40px_rgba(27,67,50,0.4)] flex items-center justify-center gap-3 border border-white/10"
            >
              Déguster avec du Fufu
              <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-1 rounded-md">Malewa Mode</span>
            </motion.button>
            
            <button 
              onClick={() => { setShowModal(false); setLiked(false); }}
              className="mt-6 text-white/60 text-sm font-medium hover:text-white transition-colors"
            >
              Continuer à scroller
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
