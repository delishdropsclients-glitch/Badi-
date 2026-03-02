import React from 'react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  onClose: () => void;
  onCheckout: () => void;
}

export default function Cart({ cart, updateQuantity, onClose, onCheckout }: CartProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = cart.length > 0 ? 2500 : 0;
  const total = subtotal + delivery;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex items-center justify-between p-6 bg-white shadow-sm z-10">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="font-bold text-lg text-gray-900">Mon Panier</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <ShoppingBag className="w-20 h-20 mb-4 text-gray-300" />
            <p className="font-medium text-lg">Votre panier est vide</p>
            <p className="text-sm mt-2 text-center max-w-[200px]">Ajoutez de délicieux plats pour commencer votre commande.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 leading-tight mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">{item.desc}</p>
                  <span className="font-bold text-miam-green">{item.price.toLocaleString()} FC</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-full p-1 border border-gray-100">
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-sm w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors">
                    {item.quantity === 1 ? <Trash2 className="w-4 h-4 text-red-500" /> : <Minus className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="bg-white p-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-20">
          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>Sous-total</span>
            <span className="font-medium text-gray-900">{subtotal.toLocaleString()} FC</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>Frais de livraison</span>
            <span className="font-medium text-gray-900">{delivery.toLocaleString()} FC</span>
          </div>
          <div className="h-px w-full bg-gray-100 mb-4"></div>
          <div className="flex justify-between items-end mb-6">
            <span className="font-bold text-gray-900 text-lg">Total</span>
            <span className="text-2xl font-bold text-miam-green">{total.toLocaleString()} FC</span>
          </div>
          <button 
            onClick={onCheckout}
            className="w-full bg-miam-green text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-miam-green/30 hover:bg-opacity-90 transition-all active:scale-95"
          >
            Confirmer la commande
          </button>
        </div>
      )}
    </div>
  );
}
