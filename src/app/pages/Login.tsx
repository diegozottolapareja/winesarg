import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wine, ShieldCheck, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../../imports/ChatGPT_Image_May_20__2026__12_08_26_PM.png';

export default function Login() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'seller' | 'admin' | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleFaceIDLogin = (role: 'seller' | 'admin') => {
    setSelectedRole(role);
    setAuthenticating(true);

    setTimeout(() => {
      if (role === 'seller') {
        navigate('/seller/sales');
      } else {
        navigate('/admin/dashboard');
      }
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a2e] via-[#2d1548] to-[#1a0a2e] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center z-10"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-8"
            >
              <img
                src={logo}
                alt="Wines ARG"
                className="w-80 h-auto mx-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] rounded-3xl"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/50 text-sm tracking-[0.3em] uppercase"
            >
              Plataforma Premium de Vinos
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md z-10"
          >
            <div className="text-center mb-14">
              <div className="flex items-center justify-center mb-4">
                <img
                  src={logo}
                  alt="Wines ARG"
                  className="w-56 h-auto rounded-2xl"
                />
              </div>
              <p className="text-white/50 text-sm tracking-wide">Bienvenido</p>
            </div>

            <div className="space-y-5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFaceIDLogin('seller')}
                disabled={authenticating}
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-7 hover:bg-white/15 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] disabled:opacity-50 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 group-hover:via-purple-500/20 transition-all duration-500"></div>
                <div className="flex items-center gap-5 relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg">
                    <Wine className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-medium text-white mb-1">Ingresar como Vendedor</h3>
                    <p className="text-white/50 text-sm">Acceso a catálogo y ventas</p>
                  </div>
                  <Fingerprint className={`w-7 h-7 text-white/30 ${authenticating && selectedRole === 'seller' ? 'animate-pulse' : ''}`} />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFaceIDLogin('admin')}
                disabled={authenticating}
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-7 hover:bg-white/15 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] disabled:opacity-50 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 group-hover:via-blue-500/20 transition-all duration-500"></div>
                <div className="flex items-center gap-5 relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-medium text-white mb-1">Ingresar como Administrador</h3>
                    <p className="text-white/50 text-sm">Dashboard y análisis</p>
                  </div>
                  <Fingerprint className={`w-7 h-7 text-white/30 ${authenticating && selectedRole === 'admin' ? 'animate-pulse' : ''}`} />
                </div>
              </motion.button>
            </div>

            <AnimatePresence>
              {authenticating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-10 text-center"
                >
                  <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-7 py-4 shadow-lg">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    >
                      <Fingerprint className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className="text-white/90 text-sm font-medium">Autenticando...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-white/30 text-xs mt-14 tracking-wide">
              Seguridad con Face ID • Toca para autenticar
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
