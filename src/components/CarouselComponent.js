import React from 'react';
import { Carousel } from 'react-bootstrap';
import './CarouselComponent.css';

const CarouselComponent = () => {
  return (
    <div className="carousel-wrapper">
      <Carousel controls={true} indicators={false} fade>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/images/banner1.jpg"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/images/banner2.jpg"
            alt="Second slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/images/banner3.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
