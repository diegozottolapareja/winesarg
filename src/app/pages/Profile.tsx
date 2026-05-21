import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Mail, Phone, MapPin, Briefcase, LogOut, Bell, Lock, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileProps {
  role: 'seller' | 'admin';
}

export default function Profile({ role }: ProfileProps) {
  const navigate = useNavigate();

  const profileData = {
    seller: {
      name: 'Carlos Martinez',
      email: 'carlos.martinez@winesarg.com',
      phone: '+54 261 123-4567',
      role: 'Vendedor de Vinos',
      winery: 'Wines ARG',
      location: 'Mendoza, Argentina',
      photo: 'https://i.pravatar.cc/300?img=12',
      stats: [
        { label: 'Ventas Totales', value: '$52.300' },
        { label: 'Botellas Vendidas', value: '176' },
        { label: 'Días Activos', value: '7/7' },
      ],
    },
    admin: {
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@winesarg.com',
      phone: '+54 261 987-6543',
      role: 'Administrador',
      winery: 'Wines ARG',
      location: 'Mendoza, Argentina',
      photo: 'https://i.pravatar.cc/300?img=45',
      stats: [
        { label: 'Ingresos Totales', value: '$328.400' },
        { label: 'Vendedores Activos', value: '8' },
        { label: 'Productos', value: '24' },
      ],
    },
  };

  const data = profileData[role];

  const settings = [
    {
      icon: Bell,
      label: 'Notificaciones',
      description: 'Gestionar preferencias de notificaciones',
    },
    {
      icon: Lock,
      label: 'Seguridad',
      description: 'Cambiar contraseña y configuración de seguridad',
    },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-wine-purple to-wine-burgundy border-b border-wine-burgundy px-4 md:px-6 py-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl text-white">Perfil</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-wine-purple to-wine-burgundy rounded-3xl p-6 md:p-8 mb-6 text-white"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <img
                src={data.photo}
                alt={data.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/20"
              />
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 text-wine-purple" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl mb-2">{data.name}</h2>
              <p className="text-white/80 mb-4">{data.role}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {data.stats.map(stat => (
                  <div key={stat.label} className="text-center md:text-left">
                    <p className="text-2xl">{stat.value}</p>
                    <p className="text-sm text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-border mb-6"
        >
          <h3 className="text-xl text-dark-graphite mb-6">Información Personal</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-wine-purple/10 flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-5 h-5 text-wine-purple" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-1">Nombre Completo</p>
                <p className="text-dark-graphite">{data.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-wine-purple/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-wine-purple" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-1">Correo Electrónico</p>
                <p className="text-dark-graphite truncate">{data.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-wine-purple/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-wine-purple" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-1">Número de Teléfono</p>
                <p className="text-dark-graphite">{data.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-wine-purple/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-wine-purple" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-1">Bodega</p>
                <p className="text-dark-graphite">{data.winery}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-wine-purple/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-wine-purple" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-1">Ubicación</p>
                <p className="text-dark-graphite">{data.location}</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 py-4 bg-wine-purple text-white rounded-2xl hover:bg-wine-burgundy transition-colors">
            Editar Perfil
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-border mb-6"
        >
          <h3 className="text-xl text-dark-graphite mb-6">Configuración</h3>
          <div className="space-y-3">
            {settings.map(setting => {
              const Icon = setting.icon;
              return (
                <button
                  key={setting.label}
                  className="w-full flex items-center gap-4 p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-wine-purple/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-wine-purple" />
                  </div>
                  <div className="flex-1">
                    <p className="text-dark-graphite mb-1">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 py-4 bg-destructive/10 text-destructive rounded-2xl hover:bg-destructive/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </motion.button>
      </main>
    </div>
  );
}
