import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext'; // ✅ Import useToast
import { Container, Form, Button } from 'react-bootstrap';

const Register = () => {
  const { login } = useAuth();
  const { showToast } = useToast(); // ✅ Use toast context
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/register', form);
      login(res.data);
      showToast('Registration successful!', 'success'); // ✅ Toast on success
      navigate('/');
    } catch (err) {
      showToast(err.response?.data?.message || 'Registration failed', 'danger'); // ✅ Toast on failure
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white p-5 rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Create Account</h2>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mb-3">
            Sign Up
          </Button>
        </Form>

        <div className="text-center">
          <span className="text-muted">Already registered? </span>
          <Link to="/login" className="fw-semibold text-primary text-decoration-none">
            Click here to login
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Register;
