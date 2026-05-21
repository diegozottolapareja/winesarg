import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, Send, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import img1 from '../../imports/image-2.png';
import img2 from '../../imports/image-4.png';
import img3 from '../../imports/image-6.png';
import img4 from '../../imports/image-9.png';
import img5 from '../../imports/image-5.png';
import img6 from '../../imports/image-3.png';
import img7 from '../../imports/image-1.png';
import img8 from '../../imports/image-7.png';
import img9 from '../../imports/image-2.png';
import logo from '../../imports/ChatGPT_Image_May_20__2026__12_34_00_PM.png';

const ALL_WINES = [
  {
    id: 1,
    name: 'Reserva Malbec',
    year: 2023,
    category: 'Vino Tinto',
    price: 8500,
    stock: 48,
    winery: 'Bodega Norton, Mendoza',
    description: 'Un elegante Malbec con intensos aromas a ciruelas maduras y moras, complementado con sutiles notas de vainilla y especias del envejecimiento en roble.',
    tastingNotes: ['Moras', 'Ciruela', 'Vainilla', 'Roble', 'Tabaco'],
    image: img1,
  },
  {
    id: 2,
    name: 'Cabernet Sauvignon',
    year: 2022,
    category: 'Vino Tinto',
    price: 7800,
    stock: 36,
    winery: 'Catena Zapata, Mendoza',
    description: 'Un Cabernet Sauvignon de cuerpo completo con capas complejas de grosella negra, cedro y chocolate amargo.',
    tastingNotes: ['Grosella Negra', 'Cedro', 'Chocolate', 'Cuero', 'Hierbas'],
    image: img2,
  },
  {
    id: 3,
    name: 'Malbec Roble',
    year: 2023,
    category: 'Vino Tinto',
    price: 6900,
    stock: 0,
    winery: 'Finca Sophenia, Tupungato',
    description: 'Un Malbec Roble con carácter y estructura, notas de frutas rojas y un toque de madera.',
    tastingNotes: ['Frutas Rojas', 'Roble', 'Especias', 'Vainilla', 'Ciruela'],
    image: img3,
  },
  {
    id: 4,
    name: 'Gran Blend',
    year: 2022,
    category: 'Vino Tinto',
    price: 9200,
    stock: 28,
    winery: 'Chacra, Patagonia',
    description: 'Blend elegante de Malbec, Cabernet y Syrah con gran complejidad y aromas intensos.',
    tastingNotes: ['Cereza Negra', 'Frutilla', 'Cuero', 'Especias', 'Chocolate'],
    image: img4,
  },
  {
    id: 5,
    name: 'Chardonnay',
    year: 2023,
    category: 'Vino Blanco',
    price: 6400,
    stock: 40,
    winery: 'Terrazas de los Andes, Mendoza',
    description: 'Un Chardonnay refinado con acidez brillante y notas de cítricos, manzana verde y un toque de mantequilla.',
    tastingNotes: ['Cítricos', 'Manzana Verde', 'Manteca', 'Vainilla', 'Tostado'],
    image: img5,
  },
  {
    id: 6,
    name: 'Rosé de Malbec',
    year: 2023,
    category: 'Vino Rosado',
    price: 5700,
    stock: 45,
    winery: 'Luigi Bosca, Luján de Cuyo',
    description: 'Un rosado fresco y elegante con aromas florales y notas de frutos rojos.',
    tastingNotes: ['Frutilla', 'Frambuesa', 'Flores', 'Cítricos', 'Sandía'],
    image: img6,
  },
  {
    id: 7,
    name: 'Syrah Reserva',
    year: 2022,
    category: 'Vino Tinto',
    price: 8900,
    stock: 32,
    winery: 'Trapiche, Mendoza',
    description: 'Syrah audaz con sabores intensos de mora, pimienta y notas ahumadas.',
    tastingNotes: ['Mora', 'Pimienta Negra', 'Ahumado', 'Tocino', 'Violetas'],
    image: img7,
  },
  {
    id: 8,
    name: 'Torrontés',
    year: 2023,
    category: 'Vino Blanco',
    price: 5900,
    stock: 50,
    winery: 'El Esteco, Cafayate',
    description: 'Un Torrontés aromático y fresco con notas florales y cítricas características de Salta.',
    tastingNotes: ['Flores Blancas', 'Durazno', 'Cítricos', 'Rosa', 'Miel'],
    image: img8,
  },
  {
    id: 9,
    name: 'Pinot Noir',
    year: 2022,
    category: 'Vino Tinto',
    price: 10200,
    stock: 25,
    winery: 'Norton, Mendoza',
    description: 'Pinot Noir elegante y sedoso con aromas a cereza roja, frutilla y matices terrosos.',
    tastingNotes: ['Cereza Roja', 'Frutilla', 'Tierra', 'Hongos', 'Rosa'],
    image: img9,
  },
];

export default function WineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(0);

  const wine = ALL_WINES.find(w => w.id === Number(id));

  if (!wine) {
    return <div>Vino no encontrado</div>;
  }

  const quantityInCart = getItemQuantity(wine.id);
  const availableStock = wine.stock - quantityInCart;

  const updateQuantity = (change: number) => {
    setQuantity(prev => {
      const newValue = Math.max(0, prev + change);
      return newValue <= availableStock ? newValue : prev;
    });
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({
        id: wine.id,
        name: wine.name,
        price: wine.price,
        quantity: quantity,
        image: wine.image,
        category: wine.category,
        year: wine.year
      });
      setQuantity(0);
      navigate('/seller/sales');
    }
  };

  const handleGoToPayment = () => {
    if (quantity > 0) {
      addToCart({
        id: wine.id,
        name: wine.name,
        price: wine.price,
        quantity: quantity,
        image: wine.image,
        category: wine.category,
        year: wine.year
      });
      navigate('/seller/payment');
    }
  };

  const totalPrice = wine.price * quantity;

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

      <main className="max-w-5xl mx-auto p-5 md:p-8 pb-56">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 flex items-center justify-center shadow-lg border border-gray-100 relative">
              {availableStock === 0 ? (
                <div className="absolute top-4 right-4 px-4 py-2 rounded-xl text-sm font-bold shadow-lg bg-red-500 text-white z-10">
                  Sin stock
                </div>
              ) : (
                <div className={`absolute top-4 right-4 px-4 py-2 rounded-xl text-sm font-bold shadow-lg z-10 ${
                  availableStock > 5 ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                }`}>
                  Stock: {availableStock}
                </div>
              )}
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                src={wine.image}
                alt={wine.name}
                className="max-h-[400px] md:max-h-[500px] object-contain drop-shadow-2xl relative z-0"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-2">{wine.category} • {wine.year}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">{wine.name}</h2>
              <p className="text-gray-600 mb-4">{wine.winery}</p>
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] bg-clip-text text-transparent">
                ${wine.price.toLocaleString()}
              </p>
              {quantityInCart > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl"
                >
                  <p className="text-sm text-gray-600">
                    Ya tienes <span className="font-bold text-[#1a0a2e]">{quantityInCart}</span> {quantityInCart === 1 ? 'botella' : 'botellas'} en el carrito
                  </p>
                </motion.div>
              )}
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{wine.description}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notas de Cata</h3>
              <div className="flex flex-wrap gap-2">
                {wine.tastingNotes.map(note => (
                  <motion.span
                    key={note}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2.5 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 text-[#1a0a2e] rounded-2xl text-sm font-medium shadow-sm"
                  >
                    {note}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50"
      >
        <div className="max-w-5xl mx-auto p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(-1)}
                disabled={quantity === 0}
                className="w-14 h-14 rounded-2xl bg-gray-100 hover:bg-gray-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-sm"
              >
                <Minus className="w-6 h-6 text-gray-700" />
              </button>
              <div className="flex-1 text-center">
                <p className="text-sm text-gray-500 mb-1 font-medium">Cantidad</p>
                <p className="text-3xl font-bold text-gray-900">{quantity}</p>
              </div>
              <button
                onClick={() => updateQuantity(1)}
                disabled={availableStock === 0 || quantity >= availableStock}
                className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] hover:from-[#2d1548] hover:to-[#1a0a2e] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-white shadow-lg"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>

            <AnimatePresence>
              {quantity > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Precio Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] bg-clip-text text-transparent">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={quantity === 0 || availableStock === 0}
                className="flex-1 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[#1a0a2e] font-bold text-base transition-all duration-200 shadow-lg flex items-center justify-center gap-2 border-2 border-[#1a0a2e] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Package className="w-5 h-5" />
                {availableStock === 0 ? 'Sin Stock' : 'Más Botellas'}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGoToPayment}
                disabled={quantity === 0 || availableStock === 0}
                className="flex-1 py-4 bg-gradient-to-r from-[#1a0a2e] to-[#2d1548] text-white rounded-2xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold text-base flex items-center justify-center gap-2"
              >
                Pagar
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
