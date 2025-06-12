import React from 'react';
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

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext'; 
import NavigationBar from './components/Navbar';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider> {/* ✅ Wrap everything */}
          <Router>
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
              {/* Optional Footer here */}
            </div>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
