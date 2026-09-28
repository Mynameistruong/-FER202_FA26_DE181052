import { Carousel } from 'react-bootstrap';

const BannerComponent = () => {
  return (
    <section id="home" className="position-relative bg-dark text-white" aria-label="Pizza House introduction">
      <Carousel fade interval={3000} controls={true} indicators={false}>
        <Carousel.Item style={{ height: '450px' }}>
          <img
            className="d-block w-100 h-100 object-fit-cover opacity-50"
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1920&auto=format&fit=crop"
            alt="Neapolitan Pizza"
          />
          <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center h-100 top-0">
            <h1 className="display-4 fw-bold text-warning shadow-text">Neapolitan Pizza</h1>
            <p className="fs-5 text-light">If you are looking for traditional Italian pizza, the Neapolitan is the best option.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{ height: '450px' }}>
          <img
            className="d-block w-100 h-100 object-fit-cover opacity-50"
            src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1920&auto=format&fit=crop"
            alt="Delicious Pizza"
          />
          <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center h-100 top-0">
            <h1 className="display-4 fw-bold text-warning shadow-text">Fresh Ingredients</h1>
            <p className="fs-5 text-light">Baked fresh daily with authentic ingredients and rich flavors.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default BannerComponent;