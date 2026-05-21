import { useNavigate } from 'react-router-dom';
import {
  Wine,
  BarChart3,
  Package,
  MapPin,
  Bot,
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  User,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      id: 'analytics',
      title: 'Análisis de Ventas',
      description: 'Ver reportes detallados y tendencias',
      icon: BarChart3,
      color: 'from-wine-purple to-wine-burgundy',
      route: '/admin/analytics',
    },
    {
      id: 'inventory',
      title: 'Inventario',
      description: 'Gestionar stock y productos',
      icon: Package,
      color: 'from-blue-500 to-indigo-600',
      route: '/admin/analytics',
    },
    {
      id: 'tracking',
      title: 'Seguimiento de Vendedores',
      description: 'Monitorear ubicaciones y actividad',
      icon: MapPin,
      color: 'from-emerald-500 to-green-600',
      route: '/admin/tracking',
    },
    {
      id: 'ai',
      title: 'Asistente IA',
      description: 'Haz preguntas sobre tu negocio',
      icon: Bot,
      color: 'from-purple-500 to-violet-600',
      route: '/admin/ai-chat',
    },
    {
      id: 'reports',
      title: 'Reportes',
      description: 'Generar y descargar reportes',
      icon: FileText,
      color: 'from-orange-500 to-red-600',
      route: '/admin/analytics',
    },
    {
      id: 'revenue',
      title: 'Ingresos',
      description: 'Seguimiento de pagos e ingresos',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      route: '/admin/analytics',
    },
    {
      id: 'team',
      title: 'Rendimiento del Equipo',
      description: 'Ver métricas y rankings de vendedores',
      icon: Users,
      color: 'from-pink-500 to-rose-600',
      route: '/admin/analytics',
    },
  ];

  const quickStats = [
    {
      label: 'Ventas Hoy',
      value: '$45.200',
      change: '+12,5%',
      icon: TrendingUp,
      positive: true,
    },
    {
      label: 'Vendedores Activos',
      value: '8',
      change: '2 en línea',
      icon: Users,
      positive: true,
    },
    {
      label: 'Stock Bajo',
      value: '3',
      change: 'Necesita atención',
      icon: AlertCircle,
      positive: false,
    },
    {
      label: 'Botellas Vendidas',
      value: '142',
      change: '+23 hoy',
      icon: Wine,
      positive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-wine-purple to-wine-burgundy border-b border-wine-burgundy px-4 md:px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wine className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-xl md:text-2xl text-white">Wines ARG</h1>
              <p className="text-sm text-white/80">Panel de Administrador</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/admin/profile')}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl text-dark-graphite mb-2">Centro de Control</h2>
          <p className="text-muted-foreground">
            ¡Bienvenido! Aquí está lo que pasa con tu bodega.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 md:p-6 border border-border"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                      stat.positive
                        ? 'from-wine-purple to-wine-burgundy'
                        : 'from-orange-500 to-red-600'
                    } flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl md:text-3xl text-dark-graphite mb-1">{stat.value}</p>
                <p
                  className={`text-xs ${
                    stat.positive ? 'text-success' : 'text-orange-600'
                  }`}
                >
                  {stat.change}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(card.route)}
                className="group bg-white rounded-2xl p-6 md:p-8 border border-border hover:border-wine-purple hover:shadow-xl transition-all duration-300 text-left"
              >
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl text-dark-graphite mb-2">{card.title}</h3>
                <p className="text-muted-foreground">{card.description}</p>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/admin/ai-chat')}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full shadow-2xl flex items-center justify-center hover:shadow-purple-500/50 transition-all duration-300"
        >
          <Bot className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </motion.button>
      </main>
    </div>
  );
}
