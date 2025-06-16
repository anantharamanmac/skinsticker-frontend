import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: null,
  });
  const [editId, setEditId] = useState(null);

  // Define categories with label + value (ensure these values match your backend!)
  const categories = [
    { label: 'Skin', value: 'skin' },
    { label: 'Wallpaper', value: 'wallpaper' },
    { label: 'Sticker', value: 'sticker' },
    { label: 'iPhone Case', value: 'iphone_case' },
    { label: 'Galaxy Case', value: 'galaxy_case' },
    { label: 'OnePlus Case', value: 'oneplus_case' },
    { label: 'Pixel Case', value: 'pixel_case' },
  ];

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('category', form.category);
    formData.append('image', form.image);

    try {
      if (editId) {
        await API.put(`/products/${editId}`, formData);
        setEditId(null);
      } else {
        await API.post('/products', formData);
      }
      setForm({ name: '', price: '', category: '', image: null });
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
      alert(`Error saving product: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: null,
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Error deleting product');
      }
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center fw-bold">Manage Products</h2>

      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row className="g-3">
              <Col md={6}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={6}>
                <Form.Select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required={!editId}
                />
              </Col>
              <Col md={12} className="text-end">
                <Button variant={editId ? 'warning' : 'primary'} type="submit">
                  {editId ? 'Update Product' : 'Add Product'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Row className="g-4">
        {products.map((product) => (
          <Col md={4} key={product._id}>
            <Card className="shadow-sm h-100">
              <Card.Img
                variant="top"
                src={`https://backend-skinit.onrender.com/${product.image}`}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-muted text-capitalize">
                  Category: {product.category.replace('_', ' ')}
                </Card.Text>
                <Card.Text className="fw-bold text-success">₹{product.price}</Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
