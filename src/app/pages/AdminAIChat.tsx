import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SAMPLE_RESPONSES: Record<string, string> = {
  'stock': 'Basándome en el inventario actual, tienes 3 vinos con stock bajo:\n\n• Syrah Gran Reserva: 18 botellas (crítico)\n• Pinot Noir Reserva: 22 botellas (bajo)\n• Cabernet Sauvignon: 28 botellas (bajo)\n\nRecomiendo reordenar estos vinos pronto para mantener niveles adecuados de stock.',
  'sales': '¡Tu rendimiento de ventas este mes ha sido excelente! Aquí están los aspectos destacados:\n\n• Ingresos Totales: $328.400 (+23,8% vs mes pasado)\n• Botellas Vendidas: 1.247 (+18,2%)\n• Más Vendido: Reserva Malbec con 145 botellas vendidas\n• Mejor Día: Sábado con $28.500 en ventas\n\nTu mejor vendedor es Carlos M. con $52.300 en ventas totales.',
  'seller': 'Tu mejor vendedor esta semana es Carlos M. con:\n\n• Ventas Totales: $52.300\n• Botellas Vendidas: 176\n• Satisfacción del Cliente: 4,9/5\n• Días Activos: 7/7\n\nCarlos ha estado superando constantemente los objetivos y manteniendo altas calificaciones de clientes.',
  'malbec': '¡Reserva Malbec es tu vino más vendido! Aquí están los detalles:\n\n• Stock Restante: 45 botellas\n• Total Vendido Este Mes: 145 botellas\n• Ingresos Generados: $362.500\n• Ventas Diarias Promedio: 20,7 botellas\n• Calificación del Cliente: 4,8/5\n\nAl ritmo de ventas actual, deberías reordenar en aproximadamente 2 días.',
};

export default function AdminAIChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy tu Asistente IA de Wines ARG. Puedo ayudarte con:\n\n• Niveles de stock y preguntas de inventario\n• Análisis de ventas y reportes\n• Métricas de rendimiento de vendedores\n• Recomendaciones de productos\n• Insights de ingresos\n\n¿Qué te gustaría saber?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = 'Entiendo tu pregunta. Déjame ayudarte con esa información basándome en nuestros datos actuales.';

      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('stock') || lowerInput.includes('inventario')) {
        response = SAMPLE_RESPONSES['stock'];
      } else if (lowerInput.includes('venta') || lowerInput.includes('vendid') || lowerInput.includes('ingreso')) {
        response = SAMPLE_RESPONSES['sales'];
      } else if (lowerInput.includes('vendedor') || lowerInput.includes('rendimiento')) {
        response = SAMPLE_RESPONSES['seller'];
      } else if (lowerInput.includes('malbec')) {
        response = SAMPLE_RESPONSES['malbec'];
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-gradient-to-r from-wine-purple to-wine-burgundy border-b border-wine-burgundy px-4 md:px-6 py-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl text-white">Wines ARG IA</h1>
              <p className="text-xs text-white/80">Siempre aquí para ayudar</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-4">
          <AnimatePresence>
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 md:p-5 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-wine-purple to-wine-burgundy text-white'
                      : 'bg-white border border-border text-dark-graphite'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-wine-purple flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="bg-white border border-border rounded-2xl p-4 md:p-5">
                <div className="flex gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-wine-purple"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-wine-burgundy"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-wine-violet"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <div className="border-t border-border bg-white sticky bottom-0">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Pregúntame sobre tu bodega..."
              className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-muted rounded-2xl focus:outline-none focus:ring-2 focus:ring-wine-purple"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-r from-wine-purple to-wine-burgundy text-white flex items-center justify-center hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
