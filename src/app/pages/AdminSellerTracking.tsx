import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, DollarSign, Package } from 'lucide-react';
import { motion } from 'motion/react';

const sellers = [
  {
    id: 1,
    name: 'Carlos Martinez',
    photo: 'https://i.pravatar.cc/150?img=12',
    status: 'active',
    location: { lat: -32.889459, lng: -68.844759, name: 'Mendoza Wine Fair' },
    sales: 12500,
    bottles: 42,
    lastActive: '2 min ago',
  },
  {
    id: 2,
    name: 'Maria Lopez',
    photo: 'https://i.pravatar.cc/150?img=45',
    status: 'active',
    location: { lat: -32.895, lng: -68.855, name: 'Bodega Catena Zapata' },
    sales: 10800,
    bottles: 36,
    lastActive: '5 min ago',
  },
  {
    id: 3,
    name: 'Juan Perez',
    photo: 'https://i.pravatar.cc/150?img=33',
    status: 'active',
    location: { lat: -32.905, lng: -68.835, name: 'Restaurant Don Mario' },
    sales: 8900,
    bottles: 29,
    lastActive: '12 min ago',
  },
  {
    id: 4,
    name: 'Sofia Rodriguez',
    photo: 'https://i.pravatar.cc/150?img=47',
    status: 'active',
    location: { lat: -32.885, lng: -68.865, name: 'Maipu Vineyard' },
    sales: 7200,
    bottles: 24,
    lastActive: '8 min ago',
  },
  {
    id: 5,
    name: 'Diego Fernandez',
    photo: 'https://i.pravatar.cc/150?img=15',
    status: 'inactive',
    location: { lat: -32.915, lng: -68.845, name: 'Luján de Cuyo' },
    sales: 6500,
    bottles: 21,
    lastActive: '2 hours ago',
  },
];

export default function AdminSellerTracking() {
  const navigate = useNavigate();
  const [selectedSeller, setSelectedSeller] = useState<number | null>(null);

  const activeSellers = sellers.filter(s => s.status === 'active');
  const totalSales = sellers.reduce((sum, s) => sum + s.sales, 0);
  const totalBottles = sellers.reduce((sum, s) => sum + s.bottles, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-wine-purple to-wine-burgundy border-b border-wine-burgundy px-4 md:px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl text-white">Seguimiento de Vendedores</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-success" />
              </div>
              <h3 className="text-muted-foreground">Vendedores Activos</h3>
            </div>
            <p className="text-3xl text-dark-graphite">{activeSellers.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-wine-purple/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-wine-purple" />
              </div>
              <h3 className="text-muted-foreground">Ventas Totales</h3>
            </div>
            <p className="text-3xl text-dark-graphite">${totalSales.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-wine-burgundy/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-wine-burgundy" />
              </div>
              <h3 className="text-muted-foreground">Botellas Vendidas</h3>
            </div>
            <p className="text-3xl text-dark-graphite">{totalBottles}</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl overflow-hidden border border-border"
          >
            <div className="h-[500px] md:h-[600px] bg-gradient-to-br from-wine-purple/5 to-wine-burgundy/5 relative">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=800&fit=crop)',
                }}
              />

              <div className="relative h-full p-8">
                <h3 className="text-xl text-dark-graphite mb-6">Región de Mendoza</h3>

                {sellers.map((seller, index) => (
                  <motion.div
                    key={seller.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => setSelectedSeller(seller.id)}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${15 + index * 18}%`,
                      top: `${25 + (index % 3) * 20}%`,
                    }}
                  >
                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: seller.status === 'active' ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          repeat: seller.status === 'active' ? Infinity : 0,
                          duration: 2,
                        }}
                        className={`w-3 h-3 rounded-full absolute -top-1 -right-1 z-10 ${
                          seller.status === 'active' ? 'bg-success' : 'bg-muted-foreground'
                        }`}
                      />
                      <img
                        src={seller.photo}
                        alt={seller.name}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform"
                      />
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white rounded-lg shadow-xl p-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p className="text-sm text-dark-graphite mb-1">{seller.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{seller.location.name}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-wine-purple">${seller.sales.toLocaleString()}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{seller.bottles} bottles</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h3 className="text-xl text-dark-graphite mb-4">Todos los Vendedores</h3>
            {sellers.map(seller => (
              <div
                key={seller.id}
                onClick={() => setSelectedSeller(seller.id)}
                className={`bg-white rounded-2xl p-4 border-2 transition-all cursor-pointer ${
                  selectedSeller === seller.id
                    ? 'border-wine-purple shadow-lg'
                    : 'border-border hover:border-wine-purple/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={seller.photo}
                      alt={seller.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div
                      className={`w-3 h-3 rounded-full absolute -top-0.5 -right-0.5 border-2 border-white ${
                        seller.status === 'active' ? 'bg-success' : 'bg-muted-foreground'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-dark-graphite mb-1">{seller.name}</p>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {seller.location.name}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-wine-purple">${seller.sales.toLocaleString()}</span>
                      <span className="text-muted-foreground">{seller.bottles} bottles</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{seller.lastActive}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
