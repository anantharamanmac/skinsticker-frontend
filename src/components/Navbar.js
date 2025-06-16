import React from 'react';
import { Navbar, Nav, Container, Button, Badge, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Cart } from 'react-bootstrap-icons';
import './Navbar.css';

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartCount = cartItems?.length || 0;

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">
          SkinitUp
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            <Nav.Link as={Link} to="/cart" className="position-relative me-3">
              <Cart size={20} />
              {cartCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Button variant="outline-primary" as={Link} to="/register" className="ms-2">
                  Register
                </Button>
              </>
            ) : (
              <NavDropdown title={user.name || 'User'} align="end">
                {user?.isAdmin && (
                  <>
                    <NavDropdown.Item as={Link} to="/admin/dashboard">Admin Dashboard</NavDropdown.Item>
                    {/* <NavDropdown.Item as={Link} to="/admin/products">Manage Products</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/orders">Manage Orders</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/users">Manage Users</NavDropdown.Item> */}
                    <NavDropdown.Divider />
                  </>
                )}
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
