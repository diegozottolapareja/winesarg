import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Wine, Package, Users, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const salesData = [
  { day: 'Mon', sales: 12500, bottles: 42 },
  { day: 'Tue', sales: 15200, bottles: 51 },
  { day: 'Wed', sales: 18900, bottles: 63 },
  { day: 'Thu', sales: 14200, bottles: 47 },
  { day: 'Fri', sales: 22100, bottles: 74 },
  { day: 'Sat', sales: 28500, bottles: 95 },
  { day: 'Sun', sales: 25300, bottles: 84 },
];

const topWines = [
  { name: 'Reserva Malbec', sold: 145, revenue: 362500 },
  { name: 'Cabernet Sauvignon', sold: 112, revenue: 358400 },
  { name: 'Syrah Gran Reserva', sold: 89, revenue: 338200 },
  { name: 'Pinot Noir Reserva', sold: 76, revenue: 266000 },
  { name: 'Chardonnay Premium', sold: 68, revenue: 190400 },
];

const lowStockWines = [
  { name: 'Syrah Gran Reserva', stock: 18, threshold: 30, status: 'low' },
  { name: 'Pinot Noir Reserva', stock: 22, threshold: 30, status: 'low' },
  { name: 'Cabernet Sauvignon', stock: 28, threshold: 30, status: 'critical' },
];

const sellerPerformance = [
  { name: 'Carlos M.', sales: 52300 },
  { name: 'Maria L.', sales: 48700 },
  { name: 'Juan P.', sales: 43200 },
  { name: 'Sofia R.', sales: 38900 },
  { name: 'Diego F.', sales: 35100 },
];

export default function AdminAnalytics() {
  const navigate = useNavigate();

  const kpis = [
    {
      label: 'Ventas Hoy',
      value: '$45.200',
      change: '+12,5%',
      icon: DollarSign,
      positive: true,
    },
    {
      label: 'Ingresos Mensuales',
      value: '$328.400',
      change: '+23,8%',
      icon: TrendingUp,
      positive: true,
    },
    {
      label: 'Botellas Vendidas',
      value: '1.247',
      change: '+18,2%',
      icon: Wine,
      positive: true,
    },
    {
      label: 'Clientes Nuevos',
      value: '42',
      change: '+5,3%',
      icon: Users,
      positive: true,
    },
  ];

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
          <h1 className="text-xl text-white">Análisis de Ventas</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 md:p-6 border border-border"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-wine-purple to-wine-burgundy flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      kpi.positive
                        ? 'bg-success/10 text-success'
                        : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {kpi.change}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                <p className="text-2xl md:text-3xl text-dark-graphite">{kpi.value}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 md:p-8 border border-border mb-6"
        >
          <h2 className="text-xl md:text-2xl text-dark-graphite mb-6">Ventas por Día</h2>
          <div className="h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#737373" />
                <YAxis stroke="#737373" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e5e5',
                    borderRadius: '12px',
                    padding: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#6b1b4d"
                  strokeWidth={3}
                  dot={{ fill: '#6b1b4d', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 md:p-8 border border-border"
          >
            <h2 className="text-xl md:text-2xl text-dark-graphite mb-6">Vinos Más Vendidos</h2>
            <div className="space-y-4">
              {topWines.map((wine, index) => (
                <div key={wine.name} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-wine-purple/10 text-wine-purple flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-dark-graphite truncate">{wine.name}</p>
                    <p className="text-sm text-muted-foreground">{wine.sold} bottles</p>
                  </div>
                  <div className="text-right">
                    <p className="text-wine-purple">${wine.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 md:p-8 border border-border"
          >
            <h2 className="text-xl md:text-2xl text-dark-graphite mb-6">Alertas de Stock Bajo</h2>
            <div className="space-y-4">
              {lowStockWines.map(wine => (
                <div key={wine.name} className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-dark-graphite mb-1">{wine.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Umbral: {wine.threshold} botellas
                      </p>
                    </div>
                    <Package className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-orange-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-600 rounded-full"
                        style={{ width: `${(wine.stock / wine.threshold) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-orange-600 font-medium">
                      {wine.stock} restantes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 md:p-8 border border-border"
        >
          <h2 className="text-xl md:text-2xl text-dark-graphite mb-6">Ventas por Vendedor</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sellerPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#737373" />
                <YAxis stroke="#737373" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e5e5',
                    borderRadius: '12px',
                    padding: '12px',
                  }}
                />
                <Bar dataKey="sales" radius={[8, 8, 0, 0]}>
                  {sellerPerformance.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#6b1b4d' : index === 1 ? '#8b2e5f' : '#9333ea'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
