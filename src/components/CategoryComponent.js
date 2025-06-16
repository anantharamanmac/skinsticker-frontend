import React from 'react';
import { Container } from 'react-bootstrap';
import './CategoryComponent.css';  // We'll add custom scroll styling

const categories = [
  { name: 'iPhone Cases', value: 'iphone', icon: '/icons/iphone.png' },
  { name: 'Galaxy Cases', value: 'galaxy', icon: '/icons/galaxy.png' },
  { name: 'PlayStation Skins', value: 'ps', icon: '/icons/ps.png' },
  { name: 'Xbox Skins', value: 'xbox', icon: '/icons/xbox.png' },
  { name: 'Nintendo Skins', value: 'nintendo', icon: '/icons/nintendo.png' },
  { name: 'MacBook Skins', value: 'macbook', icon: '/icons/macbook.png' },
  // Add more categories
];

const CategoryComponent = ({ onSelectCategory }) => {
  return (
    <Container className="my-4">
      <div className="category-scroll">
        {categories.map((cat) => (
          <div key={cat.value} className="category-item" onClick={() => onSelectCategory(cat.value)}>
            <img src={cat.icon} alt={cat.name} className="category-icon" />
            <div className="category-name">{cat.name}</div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default CategoryComponent;
