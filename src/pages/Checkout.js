import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      if (cart.length === 0) {
        showToast('Cart is empty', 'error');
        return;
      }

      const user = JSON.parse(localStorage.getItem('user')); // ✅ retrieve logged-in user

      const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0); // ✅ calculate total

      const orderPayload = {
        userId: user?._id, // ✅ include userId
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.qty,
        })),
        totalAmount, 
        shippingAddress: shipping,
      };

      await API.post('/orders', orderPayload);

      clearCart();
      showToast('Order placed successfully!', 'success');

      setTimeout(() => navigate('/payment'), 2000); // ✅ redirect to payment page
    } catch (err) {
      console.error(err);
      showToast('Failed to place order', 'error');
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-form">
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </li>
          ))}
        </ul>
        <p className="total">Total: ₹{total}</p>
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>

      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Checkout;
