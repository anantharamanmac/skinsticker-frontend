import { Card, Button, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  // 👇 Use your deployed backend URL
  const imageBaseUrl = 'https://backend-skinit.onrender.com';

  return (
    <Card className="product-card h-100 border-0 shadow-sm rounded-4">
      <div className="image-container">
        <Card.Img
          variant="top"
          src={`${imageBaseUrl}/${product.image}`}
          alt={product.name}
          className="product-image"
        />
        <Badge bg="dark" className="product-category-badge">
          {product.category}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold text-dark">{product.name}</Card.Title>
        <Card.Text className="fw-semibold text-success fs-5">₹{product.price}</Card.Text>

        {product.stock === 0 ? (
          <Button variant="outline-secondary" disabled className="mt-auto rounded-pill">
            Out of Stock
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleAddToCart}
            className="mt-auto rounded-pill"
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
