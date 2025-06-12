import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // ✅ Step 1

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [toast, setToast] = useState({ show: false, message: '', variant: 'info' });
  const navigate = useNavigate(); // ✅ Step 2

  const showToast = (message, variant = 'info') => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    showToast('Item removed from cart', 'danger');
  };

  const handleClear = () => {
    clearCart();
    showToast('Cart cleared', 'warning');
  };

  const handleCheckout = () => {
    showToast('Proceeding to checkout', 'success');
    setTimeout(() => navigate('/checkout'), 500); // ✅ Navigate after short delay
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <Container className="py-5">
      <h2 className="mb-4 fw-bold text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <Alert variant="info" className="text-center">
          Your cart is empty.
        </Alert>
      ) : (
        <>
          <Row className="gy-3">
            {cart.map((item) => (
              <Col md={12} key={item._id}>
                <Card className="shadow-sm">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text className="text-muted">
                        ₹{item.price} × {item.qty}
                      </Card.Text>
                    </div>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Card className="mt-4 shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div className="fw-bold fs-5">Total: ₹{total}</div>
              <div>
                <Button variant="success" className="me-2" onClick={handleCheckout}>
                  Checkout
                </Button>
                <Button variant="outline-danger" size="sm" onClick={handleClear}>
                  Clear Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </>
      )}

      {/* Toast Message */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toast.variant}
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Cart</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Cart;
