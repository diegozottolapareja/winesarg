import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Banknote, Building2, QrCode } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import logo from '../../imports/ChatGPT_Image_May_20__2026__12_34_00_PM.png';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, getTotalItems, getTotalPrice } = useCart();

  const totalBottles = getTotalItems();
  const total = getTotalPrice();

  const paymentMethods = [
    {
      id: 'cash',
      name: 'Efectivo',
      icon: Banknote,
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      id: 'transfer',
      name: 'Transf.',
      icon: Building2,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'qr',
      name: 'QR',
      icon: QrCode,
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  const handlePaymentSelect = (methodId: string) => {
    if (methodId === 'qr') {
      navigate('/seller/payment/qr', { state: { items, total, totalBottles, paymentMethod: methodId } });
    } else {
      navigate('/seller/payment/success', {
        state: { items, total, totalBottles, paymentMethod: methodId },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-[#1a0a2e] via-[#2d1548] to-[#1a0a2e] px-4 py-4 sticky top-0 z-40 shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-lg">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center justify-center backdrop-blur-sm text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 flex items-center justify-center">
            <img
              src={logo}
              alt="Wines ARG"
              className="h-10 w-auto"
            />
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-5 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">¿Cómo deseas pagar?</h1>
          <p className="text-gray-600">Selecciona tu método de pago preferido</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Detalle del Carrito */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Detalle de tu compra</h2>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className="w-12 h-12 bg-gradient-to-b from-gray-50 to-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.quantity} x ${item.price.toLocaleString()}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Total de botellas</span>
                <span className="text-xl font-bold text-gray-900">{totalBottles}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total a pagar</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] bg-clip-text text-transparent">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Métodos de Pago */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Selecciona el método</h2>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.button
                    key={method.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePaymentSelect(method.id)}
                    className="aspect-square bg-white border-2 border-gray-200 hover:border-[#1a0a2e] rounded-2xl p-4 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col items-center justify-center gap-3 group"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 text-center">{method.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
