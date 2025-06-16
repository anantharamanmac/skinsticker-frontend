import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import NotFound from './pages/NotFound';

import Dashboard from './pages/Admin/Dashboard';
import ProductList from './pages/Admin/ProductList';
import UserList from './pages/Admin/UserList';
import OrderList from './pages/Admin/OrderList';

import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext'; 
import NavigationBar from './components/Navbar';
import Maintenance from './pages/Maintenance'; // 👈 Add this
import API from './services/api';

const AppContent = () => {
  const { user } = useAuth();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await API.get('/settings/maintenance');
        setMaintenanceMode(res.data.maintenanceMode);
      } catch (err) {
        console.error('Failed to fetch maintenance status');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) return <div>Loading...</div>;

  const isAdmin = user?.isAdmin;

  if (maintenanceMode && !isAdmin) {
    return <Maintenance/>;
  }

  return (
    <>
      <NavigationBar />
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />

          {/* Admin Panel Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/orders" element={<OrderList />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <AppContent />
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
};

console.log('Base URL:', API.defaults.baseURL);

export default App;
