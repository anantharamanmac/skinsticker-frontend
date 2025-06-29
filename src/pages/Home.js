import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import CarouselComponent from '../components/CarouselComponent';
import CategoryComponent from '../components/CategoryComponent';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);  // ✅ Add loading state

  const fetchProducts = (category = null) => {
    setLoading(true);  // ✅ Start loading
    let url = '/products';
    if (category) {
      url += `?category=${category}`;
    }

    API.get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err))
      .finally(() => setLoading(false));  // ✅ Stop loading
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };

  return (
    <>
      <CarouselComponent />
      <CategoryComponent onSelectCategory={handleCategorySelect} />

      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 text-primary">Explore Skins, Stickers & Wallpapers</h1>
          <p className="text-muted fs-5">
            {selectedCategory ? `Showing: ${selectedCategory}` : 'Unique styles for your gadgets and space'}
          </p>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Home;
