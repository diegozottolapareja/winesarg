import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import logo from '../../imports/ChatGPT_Image_May_20__2026__12_34_00_PM.png';

export default function PaymentQR() {
  const navigate = useNavigate();
  const location = useLocation();
  const { total = 0, totalBottles = 0 } = location.state || {};
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessing(false);
      navigate('/seller/payment/success', {
        state: { ...location.state, paymentMethod: 'qr' },
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a2e] via-[#2d1548] to-[#1a0a2e] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="Wines ARG"
            className="h-16 w-auto mx-auto mb-4 rounded-2xl"
          />
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl border border-white/20">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            Escanea el Código QR
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl mb-6 border-4 border-purple-100 shadow-inner"
          >
            <div className="w-full aspect-square bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full p-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="10" y="10" width="50" height="50" fill="#1a0a2e" />
                <rect x="140" y="10" width="50" height="50" fill="#1a0a2e" />
                <rect x="10" y="140" width="50" height="50" fill="#1a0a2e" />
                <rect x="70" y="30" width="10" height="10" fill="#1a0a2e" />
                <rect x="90" y="30" width="10" height="10" fill="#1a0a2e" />
                <rect x="110" y="30" width="10" height="10" fill="#1a0a2e" />
                <rect x="70" y="50" width="10" height="10" fill="#1a0a2e" />
                <rect x="110" y="50" width="10" height="10" fill="#1a0a2e" />
                <rect x="70" y="70" width="60" height="60" fill="#1a0a2e" />
                <rect x="85" y="85" width="30" height="30" fill="white" />
                <rect x="70" y="140" width="10" height="10" fill="#1a0a2e" />
                <rect x="90" y="140" width="10" height="10" fill="#1a0a2e" />
                <rect x="110" y="150" width="10" height="10" fill="#1a0a2e" />
                <rect x="140" y="140" width="10" height="10" fill="#1a0a2e" />
                <rect x="160" y="160" width="10" height="10" fill="#1a0a2e" />
                <rect x="180" y="180" width="10" height="10" fill="#1a0a2e" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-5 mb-6"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Botellas</span>
              <span className="text-xl font-bold text-gray-900">{totalBottles}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total a pagar</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] bg-clip-text text-transparent">
                ${total.toLocaleString()}
              </span>
            </div>
          </motion.div>

          {processing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex gap-2">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                  className="w-3 h-3 rounded-full bg-gradient-to-br from-[#1a0a2e] to-[#2d1548]"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                  className="w-3 h-3 rounded-full bg-gradient-to-br from-[#2d1548] to-purple-600"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                  className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-600 to-pink-500"
                />
              </div>
              <p className="text-gray-600 font-medium">Esperando confirmación...</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
