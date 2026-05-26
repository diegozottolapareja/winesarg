import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wine, ShoppingBag, MessageCircle, User, Plus, Minus, Search, Menu, Home, MoreHorizontal, Send, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import logo from '../../imports/ChatGPT_Image_May_20__2026__12_34_00_PM.png';

// Importaciones de imágenes locales para fallback de la maqueta
import img1 from '../../imports/image-2.png';
import img2 from '../../imports/image-4.png';
import img3 from '../../imports/image-6.png';
import img4 from '../../imports/image-9.png';
import img5 from '../../imports/image-5.png';
import img6 from '../../imports/image-3.png';
import img7 from '../../imports/image-1.png';
import img8 from '../../imports/image-7.png';
import img9 from '../../imports/image-2.png';

interface DBWine {
  id: string;
  name: string;
  winery: string;
  type: string;
  region: string;
  price: number;
  description: string;
  stock: number;
  featured: boolean;
  image_url: string;
}

// Catálogo local con IDs tipo string para no colisionar con los UUIDs de la DB
const ALL_WINES = [
  {
    id: 'mock-1',
    name: 'Reserva Malbec',
    year: 2023,
    category: 'Vino Tinto',
    price: 8500,
    stock: 48,
    image: img1,
  },
  {
    id: 'mock-2',
    name: 'Cabernet Sauvignon',
    year: 2022,
    category: 'Vino Tinto',
    price: 7800,
    stock: 36,
    image: img2,
  },
  {
    id: 'mock-3',
    name: 'Malbec Roble',
    year: 2023,
    category: 'Vino Tinto',
    price: 6900,
    stock: 0,
    image: img3,
  },
  {
    id: 'mock-4',
    name: 'Gran Blend',
    year: 2022,
    category: 'Vino Tinto',
    price: 9200,
    stock: 28,
    image: img4,
  },
  {
    id: 'mock-5',
    name: 'Chardonnay',
    year: 2023,
    category: 'Vino Blanco',
    price: 6400,
    stock: 40,
    image: img5,
  },
  {
    id: 'mock-6',
    name: 'Rosé de Malbec',
    year: 2023,
    category: 'Vino Rosado',
    price: 5700,
    stock: 45,
    image: img6,
  },
  {
    id: 'mock-7',
    name: 'Syrah Reserva',
    year: 2022,
    category: 'Vino Tinto',
    price: 8900,
    stock: 32,
    image: img7,
  },
  {
    id: 'mock-8',
    name: 'Torrontés',
    year: 2023,
    category: 'Vino Blanco',
    price: 5900,
    stock: 50,
    image: img8,
  },
  {
    id: 'mock-9',
    name: 'Pinot Noir',
    year: 2022,
    category: 'Vino Tinto',
    price: 10200,
    stock: 25,
    image: img9,
  },
];

const ITEMS_PER_PAGE = 4;

export default function SellerSales() {
  const navigate = useNavigate();
  const { 
    items, 
    addToCart, 
    updateQuantity: updateCartQuantity, 
    getItemQuantity, 
    getTotalItems, 
    getTotalPrice,
    clearCart 
  } = useCart();
  const [activeTab, setActiveTab] = useState('sales');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOutOfStockBanner, setShowOutOfStockBanner] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const [dbWines, setDbWines] = useState<DBWine[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  // Cargamos el catálogo en tiempo real con el stock legítimo de Supabase
  useEffect(() => {
    const loadWinesFromDB = async () => {
      try {
        const response = await fetch('/api/wines');
        const json = await response.json();
        if (json.success) {
          setDbWines(json.data);
        } else {
          throw new Error(json.error || 'Error cargando catálogo dinámico');
        }
      } catch (err) {
        console.error('Error al conectar con /api/wines:', err);
        setApiError(err instanceof Error ? err.message : 'Error de base de datos');
      }
    };
    loadWinesFromDB();
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery]);

  // Sincronizamos las propiedades inyectando el valor de 'stock' real que viene de Supabase
  const formattedDBWines = dbWines.map((wine) => ({
    id: wine.id, 
    name: wine.name,
    year: 2026, 
    category: wine.type,
    price: Number(wine.price),
    stock: Number(wine.stock), // CAMBIO: Sincronización directa del stock real de DB
    image: wine.image_url || img1, 
    isDynamic: true, 
  }));

  const COMBINED_CATALOG = [...ALL_WINES, ...formattedDBWines];

  const filteredWines = COMBINED_CATALOG.filter(wine => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase().trim();
    const searchTerms = query.split(/\s+/);

    const searchableText = `${wine.name} ${wine.category} ${wine.year}`.toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });

  const visibleWines = filteredWines.slice(0, visibleCount);
  const hasMore = visibleCount < filteredWines.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredWines.length));
            setIsLoading(false);
          }, 300);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, isLoading, filteredWines.length]);

  // Ajuste de firma: wineId ahora se procesa limpiamente como string
  const updateQuantity = (wineId: string, change: number) => {
    const wine = COMBINED_CATALOG.find(w => w.id === wineId);
    if (!wine) return;

    const current = getItemQuantity(wineId);
    const newValue = current + change;

    if (newValue < 0) return;

    // Validación estricta contra el stock dinámico de Supabase
    if (newValue > wine.stock) {
      setShowOutOfStockBanner(true);
      setTimeout(() => setShowOutOfStockBanner(false), 3000);
      return;
    }

    if (newValue === 0) {
      updateCartQuantity(wineId, 0);
    } else if (current === 0 && change > 0) {
      addToCart({
        id: wine.id,
        name: wine.name,
        price: wine.price,
        quantity: change,
        image: wine.image,
        category: wine.category,
        year: wine.year
      });
    } else {
      updateCartQuantity(wineId, newValue);
    }
  };

  const totalBottles = getTotalItems();
  const total = getTotalPrice();

  // Ajuste de firma a string para validar contra el inventario real
  const getAvailableStock = (wineId: string) => {
    const wine = COMBINED_CATALOG.find(w => w.id === wineId);
    if (!wine) return 0;
    const quantityInCart = getItemQuantity(wineId);
    return wine.stock - quantityInCart;
  };

  const handleWineClick = (wineId: string) => {
    navigate(`/seller/wine/${wineId}`);
  };

  const handleGoToPayment = () => {
    navigate('/seller/payment', { state: { items, total } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col">
      <AnimatePresence>
        {showOutOfStockBanner && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="font-semibold">Sin stock disponible</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-gradient-to-r from-[#1a0a2e] via-[#2d1548] to-[#1a0a2e] px-4 py-4 sticky top-0 z-40 shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/seller/profile')}
              className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-center flex-1">
              <img
                src={logo}
                alt="Wines ARG"
                className="h-14 w-autoale-110"
              />
            </div>
            <button
              onClick={() => totalBottles > 0 && handleGoToPayment()}
              disabled={totalBottles === 0}
              className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 relative disabled:opacity-50"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalBottles > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-lg"
                >
                  {totalBottles}
                </motion.span>
              )}
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar vino..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/95 backdrop-blur-sm rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-white/40 shadow-lg transition-all duration-200 placeholder:text-gray-400"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-44 scroll-smooth">
        <div className="max-w-7xl mx-auto p-5">
          {apiError && (
            <div className="mb-4 p-3 text-xs bg-red-50 text-red-600 rounded-xl border border-red-100">
              ⚠️ No se pudieron sincronizar las novedades de la base de datos. Mostrando maqueta local.
            </div>
          )}

          {filteredWines.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Search className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron vinos</h3>
              <p className="text-gray-500 text-center">Intenta con otra búsqueda</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                {visibleWines.map((wine, index) => {
                  const availableStock = getAvailableStock(wine.id);
                  return (
                    <motion.div
                      key={wine.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: (index % ITEMS_PER_PAGE) * 0.05,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      whileHover={{ y: -4 }}
                      className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border ${
                        'isDynamic' in wine 
                          ? 'border-purple-200/60 bg-gradient-to-b from-white to-purple-50/10' 
                          : 'border-gray-100'
                      }`}
                    >
                      <div className="p-4">
                        <div
                          onClick={() => handleWineClick(wine.id)}
                          className="relative h-44 mb-4 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white rounded-2xl cursor-pointer overflow-hidden"
                        >
                          {'isDynamic' in wine && (
                            <span className="absolute top-3 left-3 bg-purple-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow z-10">
                              DB Real
                            </span>
                          )}

                          {availableStock === 0 ? (
                            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm bg-red-500/90 text-white z-10">
                              Sin stock
                            </div>
                          ) : (
                            <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm z-10 ${
                              availableStock > 5 ? 'bg-green-500/90 text-white' : 'bg-orange-500/90 text-white'
                            }`}>
                              {availableStock}
                            </div>
                          )}
                          <img
                            src={wine.image}
                            alt={wine.name}
                            className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <div
                          onClick={() => handleWineClick(wine.id)}
                          className="text-center space-y-1.5 cursor-pointer mb-4"
                        >
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] leading-tight">{wine.name}</h3>
                          <p className="text-xs text-gray-500 font-medium">{wine.year}</p>
                          <p className="text-2xl font-bold bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] bg-clip-text text-transparent">
                            $ {wine.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(wine.id, -1);
                            }}
                            disabled={getItemQuantity(wine.id) === 0}
                            className="flex-1 h-11 rounded-2xl bg-gray-100 hover:bg-gray-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-sm"
                          >
                            <Minus className="w-5 h-5 text-gray-700" />
                          </button>
                          <div className="w-14 text-center">
                            <span className="text-xl font-bold text-gray-900">{getItemQuantity(wine.id)}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(wine.id, 1);
                            }}
                            disabled={availableStock === 0}
                            className="flex-1 h-11 rounded-2xl bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] hover:from-[#2d1548] hover:to-[#1a0a2e] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-white shadow-lg"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {hasMore && (
                <div ref={observerRef} className="flex justify-center py-10">
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                        className="w-3 h-3 rounded-full bg-gradient-to-br from-[#1a0a2e] to-[#2d1548]"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-3 h-3 rounded-full bg-gradient-to-br from-[#2d1548] to-[#1a0a2e]"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-3 h-3 rounded-full bg-gradient-to-br from-[#1a0a2e] to-[#2d1548]"
                      />
                    </motion.div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <AnimatePresence>
        {totalBottles > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-20 left-4 right-4 z-40"
          >
            <div className="bg-gradient-to-r from-[#1a0a2e] via-[#2d1548] to-[#1a0a2e] backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white/60 text-xs font-medium mb-1">Total de botellas</p>
                  <p className="text-white text-2xl font-bold">{totalBottles}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs font-medium mb-1">Total a pagar</p>
                  <p className="text-white text-2xl font-bold">$ {total.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => clearCart()}
                  className="px-4 py-4 bg-white/10 hover:bg-red-500/20 border border-white/20 rounded-2xl text-white transition-all duration-200 active:scale-95 flex items-center justify-center"
                  title="Limpiar carrito"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleGoToPayment}
                  className="flex-1 py-4 bg-white hover:bg-gray-100 rounded-2xl text-[#1a0a2e] font-bold text-base transition-all duration-200 active:scale-98 shadow-lg flex items-center justify-center gap-2"
                >
                  Ir a Pagar
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex px-2">
          <button
            onClick={() => setActiveTab('sales')}
            className={`flex-1 py-3 flex flex-col items-center gap-1.5 transition-all duration-200 ${
              activeTab === 'sales' ? 'text-[#1a0a2e]' : 'text-gray-400'
            }`}
          >
            <Home className={`w-6 h-6 ${activeTab === 'sales' ? 'scale-110' : ''} transition-transform`} />
            <span className="text-[10px] font-medium">Inicio</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('my-sales');
              navigate('/seller/profile');
            }}
            className={`flex-1 py-3 flex flex-col items-center gap-1.5 transition-all duration-200 ${
              activeTab === 'my-sales' ? 'text-[#1a0a2e]' : 'text-gray-400'
            }`}
          >
            <ShoppingBag className={`w-6 h-6 ${activeTab === 'my-sales' ? 'scale-110' : ''} transition-transform`} />
            <span className="text-[10px] font-medium">Mis Ventas</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('chat');
              window.open('https://wa.me/', '_blank');
            }}
            className={`flex-1 py-3 flex flex-col items-center gap-1.5 transition-all duration-200 ${
              activeTab === 'chat' ? 'text-[#1a0a2e]' : 'text-gray-400'
            }`}
          >
            <MessageCircle className={`w-6 h-6 ${activeTab === 'chat' ? 'scale-110' : ''} transition-transform`} />
            <span className="text-[10px] font-medium">Chat</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('more');
              navigate('/seller/profile');
            }}
            className={`flex-1 py-3 flex flex-col items-center gap-1.5 transition-all duration-200 ${
              activeTab === 'more' ? 'text-[#1a0a2e]' : 'text-gray-400'
            }`}
          >
            <MoreHorizontal className={`w-6 h-6 ${activeTab === 'more' ? 'scale-110' : ''} transition-transform`} />
            <span className="text-[10px] font-medium">Más</span>
          </button>
        </div>
      </nav>
    </div>
  );
}