import { Carousel } from 'react-bootstrap';
import { banners } from '../data/banners';

function MyCarousel() {
  return (
    <Carousel className="home-carousel" interval={4000} pause="hover">
      {banners.map((banner) => (
        <Carousel.Item key={banner.id}>
          <img
            className="d-block w-100 home-carousel__image"
            src={banner.image}
            alt={banner.title}
          />
          <Carousel.Caption className="home-carousel__caption">
            <h2>{banner.title}</h2>
            <p>{banner.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MyCarousel;