import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const categories = [
  { name: 'Skins', value: 'skin' },
  { name: 'Stickers', value: 'sticker' },
  { name: 'Wallpapers', value: 'wallpaper' },
];

const CategoryComponent = ({ onSelectCategory }) => {
  return (
    <Container className="my-4">
      <h2 className="text-center text-primary mb-3">Browse by Category</h2>
      <Row className="justify-content-center g-3">
        {categories.map((cat) => (
          <Col key={cat.value} xs="auto">
            <Button variant="outline-primary" onClick={() => onSelectCategory(cat.value)}>
              {cat.name}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoryComponent;
