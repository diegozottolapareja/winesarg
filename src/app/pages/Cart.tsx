import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import logo from '../../imports/ChatGPT_Image_May_20__2026__12_34_00_PM.png';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  const totalBottles = getTotalItems();
  const total = getTotalPrice();

  const handleUpdateQuantity = (id: number, change: number) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleGoToPayment = () => {
    navigate('/seller/payment', { state: { items, total } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col">
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

      <main className="flex-1 overflow-y-auto pb-44">
        <div className="max-w-5xl mx-auto p-5">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Carrito</h1>
            <p className="text-gray-600">
              {totalBottles} {totalBottles === 1 ? 'botella' : 'botellas'} en tu carrito
            </p>
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-500 text-center mb-6">Agrega algunas botellas para comenzar</p>
              <button
                onClick={() => navigate('/seller/sales')}
                className="px-6 py-3 bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-200"
              >
                Explorar Vinos
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gradient-to-b from-gray-50 to-white rounded-2xl flex items-center justify-center flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.category} • {item.year}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all duration-200 active:scale-95"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-200 flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4 text-gray-700" />
                            </button>
                            <div className="w-12 text-center">
                              <span className="text-xl font-bold text-gray-900">{item.quantity}</span>
                            </div>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] hover:from-[#2d1548] hover:to-[#1a0a2e] active:scale-95 transition-all duration-200 flex items-center justify-center text-white"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">${item.price.toLocaleString()} c/u</p>
                            <p className="text-xl font-bold bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] bg-clip-text text-transparent">
                              ${(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      {items.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50"
        >
          <div className="max-w-5xl mx-auto p-5">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Total de botellas</span>
                <span className="text-2xl font-bold text-gray-900">{totalBottles}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total a pagar</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] bg-clip-text text-transparent">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleGoToPayment}
              className="w-full py-5 bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] text-white rounded-2xl hover:shadow-2xl transition-all duration-200 font-bold text-lg flex items-center justify-center gap-3"
            >
              <ShoppingCart className="w-6 h-6" />
              Ir a Pagar
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
