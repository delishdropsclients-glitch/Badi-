import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import StandardHome from './components/StandardHome';
import VideoFeed from './components/VideoFeed';
import MalewaHome from './components/MalewaHome';
import FufuBuilder from './components/FufuBuilder';
import BottomNav from './components/BottomNav';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SuccessScreen from './components/SuccessScreen';
import OrderTracking from './components/OrderTracking';
import Profile from './components/Profile';
import { CartItem, AppTheme, AppView } from './types';

export default function App() {
  const [theme, setTheme] = useState<AppTheme>('standard');
  const [view, setView] = useState<AppView>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [initialProtein, setInitialProtein] = useState<string>('poulet');

  useEffect(() => {
    if (theme === 'malewa' || view === 'builder') {
      document.body.style.backgroundColor = '#FCF9F2'; // miam-bg-malewa
    } else if (view === 'videos') {
      document.body.style.backgroundColor = '#000000'; // Video feed bg
    } else {
      document.body.style.backgroundColor = '#F9FAFB'; // miam-bg-standard
    }
  }, [theme, view]);

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const handleSwitchToMalewa = (proteinId: string) => {
    setInitialProtein(proteinId);
    setTheme('malewa');
    setView('builder');
  };

  const renderView = () => {
    if (view === 'home' && theme === 'standard') {
      return (
        <motion.div key="standard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full pb-24">
          <StandardHome onAddToCart={handleAddToCart} />
        </motion.div>
      );
    }
    if (view === 'home' && theme === 'malewa') {
      return (
        <motion.div key="malewa" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="h-full pb-24">
          <MalewaHome onStartBuilder={() => setView('builder')} />
        </motion.div>
      );
    }
    if (view === 'videos') {
      return (
        <motion.div key="videos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
          <VideoFeed onSwitchToMalewa={handleSwitchToMalewa} />
        </motion.div>
      );
    }
    if (view === 'builder') {
      return (
        <motion.div key="builder" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="h-full absolute inset-0 z-50 bg-miam-bg-malewa">
          <FufuBuilder initialProtein={initialProtein} onClose={() => setView('home')} onAddToCart={(item) => { handleAddToCart(item); setView('cart'); }} />
        </motion.div>
      );
    }
    if (view === 'cart') {
      return (
        <motion.div key="cart" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '-100%' }} className="h-full absolute inset-0 z-50 bg-white">
          <Cart cart={cart} updateQuantity={updateQuantity} onClose={() => setView('home')} onCheckout={() => setView('checkout')} />
        </motion.div>
      );
    }
    if (view === 'checkout') {
      return (
        <motion.div key="checkout" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '-100%' }} className="h-full absolute inset-0 z-50 bg-white">
          <Checkout cart={cart} onBack={() => setView('cart')} onPay={() => setView('success')} />
        </motion.div>
      );
    }
    if (view === 'success') {
      return (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="h-full absolute inset-0 z-50 bg-white">
          <SuccessScreen onContinue={() => { clearCart(); setView('home'); }} onTrack={() => setView('tracking')} />
        </motion.div>
      );
    }
    if (view === 'tracking') {
      return (
        <motion.div key="tracking" initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} className="h-full absolute inset-0 z-50 bg-white">
          <OrderTracking onHome={() => { clearCart(); setView('home'); }} />
        </motion.div>
      );
    }
    if (view === 'profile') {
      return (
        <motion.div key="profile" initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} className="h-full absolute inset-0 z-50 bg-white">
          <Profile onClose={() => setView('home')} />
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto relative overflow-hidden shadow-2xl bg-transparent">
      <AnimatePresence mode="wait">
        {renderView()}
      </AnimatePresence>

      {(view === 'home' || view === 'videos') && (
        <BottomNav 
          theme={theme} 
          onToggleTheme={() => {
            setTheme(theme === 'standard' ? 'malewa' : 'standard');
            setView('home');
          }} 
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
          onOpenCart={() => setView('cart')}
          onOpenVideos={() => setView('videos')}
          onOpenProfile={() => setView('profile')}
          onHome={() => setView('home')}
        />
      )}
    </div>
  );
}
