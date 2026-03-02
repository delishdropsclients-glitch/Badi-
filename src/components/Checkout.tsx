import React, { useState } from 'react';
import { ArrowLeft, MapPin, CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onBack: () => void;
  onPay: () => void;
}

export default function Checkout({ cart, onBack, onPay }: CheckoutProps) {
  const [method, setMethod] = useState<'mpesa' | 'airtel' | 'card'>('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 2500;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPay();
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex items-center justify-between p-6 bg-white shadow-sm z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="font-bold text-lg text-gray-900">Paiement</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
        {/* Address */}
        <h3 className="font-bold text-gray-900 mb-4">Adresse de livraison</h3>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 mb-8">
          <div className="w-10 h-10 rounded-full bg-miam-mint/50 flex items-center justify-center text-miam-green flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-sm">Domicile</h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">143, Avenue des Champs<br/>Gombe, Kinshasa</p>
          </div>
          <button className="text-xs font-bold text-miam-green hover:underline">Modifier</button>
        </div>

        {/* Payment Methods */}
        <h3 className="font-bold text-gray-900 mb-4">Moyen de paiement</h3>
        <div className="flex flex-col gap-3 mb-8">
          <button 
            onClick={() => setMethod('mpesa')}
            className={`flex items-center p-4 rounded-2xl border-2 transition-all ${method === 'mpesa' ? 'border-miam-green bg-miam-mint/10' : 'border-transparent bg-white shadow-sm hover:border-gray-200'}`}
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <span className="block font-bold text-gray-900">M-Pesa</span>
              <span className="text-xs text-gray-500">Paiement mobile</span>
            </div>
            {method === 'mpesa' && <CheckCircle2 className="w-6 h-6 text-miam-green" />}
          </button>

          <button 
            onClick={() => setMethod('airtel')}
            className={`flex items-center p-4 rounded-2xl border-2 transition-all ${method === 'airtel' ? 'border-miam-green bg-miam-mint/10' : 'border-transparent bg-white shadow-sm hover:border-gray-200'}`}
          >
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <span className="block font-bold text-gray-900">Airtel Money</span>
              <span className="text-xs text-gray-500">Paiement mobile</span>
            </div>
            {method === 'airtel' && <CheckCircle2 className="w-6 h-6 text-miam-green" />}
          </button>

          <button 
            onClick={() => setMethod('card')}
            className={`flex items-center p-4 rounded-2xl border-2 transition-all ${method === 'card' ? 'border-miam-green bg-miam-mint/10' : 'border-transparent bg-white shadow-sm hover:border-gray-200'}`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <span className="block font-bold text-gray-900">Carte Bancaire</span>
              <span className="text-xs text-gray-500">Visa, Mastercard</span>
            </div>
            {method === 'card' && <CheckCircle2 className="w-6 h-6 text-miam-green" />}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-20">
        <button 
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full bg-gray-900 text-white py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-800 transition-all active:scale-95 flex justify-center items-center"
        >
          {isProcessing ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            `Payer ${total.toLocaleString()} FC`
          )}
        </button>
      </div>
    </div>
  );
}
