import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, CheckCircle2 } from 'lucide-react';

interface ProfileProps {
  onClose: () => void;
}

export default function Profile({ onClose }: ProfileProps) {
  const [step, setStep] = useState<'method' | 'phone' | 'email' | 'code' | 'done'>('method');
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [inputValue, setInputValue] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
    }, 1000);
  };

  const handleVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('done');
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex items-center justify-between p-6 bg-white shadow-sm z-10">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="font-bold text-lg text-gray-900">Mon Profil</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 hide-scrollbar flex flex-col">
        {step === 'method' && (
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Bienvenue sur miam</h3>
            <p className="text-sm text-gray-500 mb-8 text-center">Connectez-vous pour suivre vos commandes et enregistrer vos plats favoris.</p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => { setMethod('phone'); setStep('phone'); }}
                className="flex items-center p-4 rounded-2xl border-2 border-transparent bg-white shadow-sm hover:border-miam-green transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-miam-mint/30 flex items-center justify-center text-miam-green mr-4">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-bold text-gray-900">Continuer avec un numéro</span>
              </button>

              <button 
                onClick={() => { setMethod('email'); setStep('email'); }}
                className="flex items-center p-4 rounded-2xl border-2 border-transparent bg-white shadow-sm hover:border-miam-green transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-bold text-gray-900">Continuer avec un email</span>
              </button>
            </div>
          </div>
        )}

        {(step === 'phone' || step === 'email') && (
          <div className="flex-1 flex flex-col pt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {step === 'phone' ? 'Votre numéro' : 'Votre email'}
            </h3>
            <p className="text-sm text-gray-500 mb-8">
              {step === 'phone' 
                ? 'Nous allons vous envoyer un code par SMS pour vérifier votre numéro.' 
                : 'Nous allons vous envoyer un code par email pour vérifier votre adresse.'}
            </p>
            
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex items-center gap-3">
              {step === 'phone' ? (
                <>
                  <span className="font-bold text-gray-500 border-r border-gray-200 pr-3">+243</span>
                  <input 
                    type="tel" 
                    placeholder="81 234 5678" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none font-bold text-gray-900 placeholder-gray-300"
                  />
                </>
              ) : (
                <input 
                  type="email" 
                  placeholder="exemple@email.com" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none font-bold text-gray-900 placeholder-gray-300"
                />
              )}
            </div>

            <button 
              onClick={handleSendCode}
              disabled={!inputValue || isLoading}
              className="w-full bg-miam-green text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-miam-green/30 hover:bg-opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none flex justify-center items-center mt-auto"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Recevoir le code'
              )}
            </button>
          </div>
        )}

        {step === 'code' && (
          <div className="flex-1 flex flex-col pt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Vérification</h3>
            <p className="text-sm text-gray-500 mb-8">
              Entrez le code à 4 chiffres envoyé au <span className="font-bold text-gray-900">{inputValue}</span>
            </p>
            
            <div className="flex justify-between gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <input 
                  key={i}
                  type="text" 
                  maxLength={1}
                  className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 text-center text-2xl font-bold text-gray-900 focus:border-miam-green focus:ring-2 focus:ring-miam-mint outline-none transition-all"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val) {
                      setCode(prev => prev + val);
                      const next = e.target.nextElementSibling as HTMLInputElement;
                      if (next) next.focus();
                    }
                  }}
                />
              ))}
            </div>

            <button 
              onClick={handleVerify}
              disabled={code.length < 4 || isLoading}
              className="w-full bg-miam-green text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-miam-green/30 hover:bg-opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none flex justify-center items-center mt-auto"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Vérifier'
              )}
            </button>
          </div>
        )}

        {step === 'done' && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-miam-mint/30 flex items-center justify-center text-miam-green mb-6">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Compte créé !</h3>
            <p className="text-sm text-gray-500 mb-8 text-center">Vous êtes maintenant connecté à votre compte miam.</p>
            
            <button 
              onClick={onClose}
              className="w-full bg-gray-900 text-white py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-800 transition-all active:scale-95"
            >
              Retour à l'accueil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
