import React, { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, Star, Plus } from 'lucide-react';
import { CartItem } from '../types';

const CATEGORIES = [
  { id: 'pizza', name: 'Pizza', icon: '🍕', active: true },
  { id: 'burger', name: 'Burger', icon: '🍔', active: false },
  { id: 'poulet', name: 'Poulet', icon: '🍗', active: false },
  { id: 'salade', name: 'Salade', icon: '🥗', active: false },
  { id: 'fruits', name: 'Fruits', icon: '🍎', active: false },
];

const POPULAR_DISHES = [
  {
    id: 'std-1',
    name: 'Pizza Napolitaine',
    desc: 'Tomates San Marzano, Mozzarella',
    time: '20-30 min',
    rating: 4.9,
    price: 25000,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'std-2',
    name: 'Poulet Braisé',
    desc: 'Spécialités grillées et épicées',
    time: '15-25 min',
    rating: 4.8,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1598515318246-a5f1d438d529?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'std-3',
    name: 'Green Bowl',
    desc: 'Salades fraîches et healthy',
    time: '10-20 min',
    rating: 4.7,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80',
  }
];

interface StandardHomeProps {
  onAddToCart: (item: CartItem) => void;
}

export default function StandardHome({ onAddToCart }: StandardHomeProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setIsScrolled(scrollRef.current.scrollTop > 50);
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div ref={scrollRef} className="p-6 pt-12 h-full overflow-y-auto hide-scrollbar bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 transition-all duration-300">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1 transition-all duration-300">
            {isScrolled ? "J'espère que vous ferez un bon choix" : "C'est l'heure de manger !"}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight transition-all duration-300">
            {isScrolled ? "Bon appétit !" : "Bonjour !"}
          </h1>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-miam-earth to-miam-mint p-[2px] shadow-sm">
          <div className="w-full h-full rounded-full bg-white overflow-hidden border-2 border-white">
            <img src="https://i.pravatar.cc/150?img=32" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-8">
        <div className="flex-1 bg-white rounded-2xl flex items-center px-4 py-3.5 shadow-sm border border-gray-100">
          <Search className="text-gray-400 w-5 h-5 mr-3" />
          <input 
            type="text" 
            placeholder="Rechercher un plat, un resto..." 
            className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-400 font-medium"
          />
        </div>
        <button className="bg-gray-900 text-white p-3.5 rounded-2xl shadow-sm hover:bg-gray-800 transition-colors">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar mb-10 pb-2 -mx-6 px-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="flex flex-col items-center gap-2 min-w-[72px]">
            <button 
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                cat.active 
                  ? 'bg-miam-green text-white shadow-md shadow-miam-green/20' 
                  : 'bg-white text-gray-600 shadow-sm border border-gray-100 hover:bg-gray-50'
              }`}
            >
              {cat.icon}
            </button>
            <span className={`text-xs font-semibold ${cat.active ? 'text-gray-900' : 'text-gray-500'}`}>
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      {/* Popular Dishes Grid */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">À la une</h2>
        <button className="text-sm text-miam-green font-semibold hover:opacity-80">Voir tout</button>
      </div>

      <div className="flex flex-col gap-6">
        {POPULAR_DISHES.map((item) => (
          <div key={item.id} className="bg-white rounded-[2rem] p-3 shadow-sm border border-gray-100 group">
            {/* Image Container */}
            <div className="w-full h-48 rounded-[1.5rem] overflow-hidden relative mb-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-gray-900">{item.rating}</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="px-2 pb-2 relative">
              <div className="flex justify-between items-start mb-1 pr-12">
                <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-3 pr-12">{item.desc}</p>
              
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-600">
                <span className="bg-gray-100 px-2.5 py-1 rounded-md">{item.time}</span>
                <span className="bg-miam-mint/50 text-miam-green px-2.5 py-1 rounded-md">{item.price.toLocaleString()} FC</span>
              </div>

              <button 
                onClick={() => onAddToCart({
                  id: item.id,
                  name: item.name,
                  desc: item.desc,
                  price: item.price,
                  quantity: 1,
                  image: item.image
                })}
                className="absolute bottom-0 right-0 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-md hover:bg-miam-green transition-colors active:scale-95"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

