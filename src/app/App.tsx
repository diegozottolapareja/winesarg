import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Login from './pages/Login';
import SellerSales from './pages/SellerSales';
import WineDetail from './pages/WineDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import PaymentQR from './pages/PaymentQR';
import PaymentSuccess from './pages/PaymentSuccess';
import AdminDashboard from './pages/AdminDashboard';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminSellerTracking from './pages/AdminSellerTracking';
import AdminAIChat from './pages/AdminAIChat';
import Profile from './pages/Profile';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="size-full">
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/seller/sales" element={<SellerSales />} />
            <Route path="/seller/wine/:id" element={<WineDetail />} />
            <Route path="/seller/cart" element={<Cart />} />
            <Route path="/seller/payment" element={<Payment />} />
            <Route path="/seller/payment/qr" element={<PaymentQR />} />
            <Route path="/seller/payment/success" element={<PaymentSuccess />} />
            <Route path="/seller/profile" element={<Profile role="seller" />} />

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/tracking" element={<AdminSellerTracking />} />
            <Route path="/admin/ai-chat" element={<AdminAIChat />} />
            <Route path="/admin/profile" element={<Profile role="admin" />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}