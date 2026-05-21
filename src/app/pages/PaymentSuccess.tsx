import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { useCart } from '../contexts/CartContext';
import logo from '../../imports/ChatGPT_Image_May_20__2026__12_34_00_PM.png';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const {
    total = 0,
    totalBottles = 0,
    paymentMethod = 'cash',
  } = location.state || {};

  // Generar número de pedido solo una vez
  const orderNumber = useMemo(() => `ORD-${Date.now().toString().slice(-6)}`, []);

  useEffect(() => {
    // Limpiar el carrito después de completar la compra
    clearCart();

    // Confetti celebration
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10b981', '#059669', '#34d399', '#6ee7b7'],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paymentMethodNames: Record<string, string> = {
    cash: 'Efectivo',
    transfer: 'Transferencia Bancaria',
    qr: 'Pago con QR',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a2e] via-[#2d1548] to-[#1a0a2e] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-4">
          <motion.img
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            src={logo}
            alt="Wines ARG"
            className="h-12 w-auto mx-auto rounded-2xl shadow-2xl"
          />
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 text-center shadow-2xl border border-white/20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
            className="flex justify-center mb-5"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-5"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Compra Completada!
            </h1>
            <p className="text-base text-gray-600">
              Gracias por tu compra
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3 mb-5"
          >
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-4 shadow-lg">
              <p className="text-xs text-gray-500 mb-2">Total Pagado</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] bg-clip-text text-transparent">
                ${total.toLocaleString()}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Cantidad de Botellas</p>
              <p className="text-xl font-bold text-gray-900">
                {totalBottles} {totalBottles === 1 ? 'botella' : 'botellas'}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Número de Pedido</p>
              <p className="text-xl font-bold text-gray-900">{orderNumber}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Método de Pago</p>
              <p className="text-xl font-bold text-gray-900">
                {paymentMethodNames[paymentMethod] || 'Efectivo'}
              </p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/seller/sales')}
            className="w-full py-4 bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] text-white rounded-2xl hover:shadow-2xl transition-all duration-200 text-base font-bold"
          >
            Nueva Venta
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
