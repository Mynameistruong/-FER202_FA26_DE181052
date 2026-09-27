import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const bannerImages = [
  "/images/pizza1.jpg",
  "/images/pizza2.jpg",
  "/images/pizza3.jpg",
  "/images/pizza4.jpg",
  "/images/pizza5.jpg"
];

const menu1 = "/images/menu1.jpg";
const menu2 = "/images/menu2.jpg";
const menu3 = "/images/menu3.jpg";
const menu4 = "/images/menu4.jpg";


function App() {

  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = () => {
    setCurrentIdx((prevIdx) => (prevIdx === 0 ? bannerImages.length - 1 : prevIdx - 1));
  };

  // Hàm chuyển ảnh sang phải (tới)
  const handleNext = () => {
    setCurrentIdx((prevIdx) => (prevIdx === bannerImages.length - 1 ? 0 : prevIdx + 1));
  };

  return (
    <div className="bg-dark text-light min-vh-100">
      {/* 1. Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4">
        <a className="navbar-brand fw-bold" href="#home">Pizza House</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><a className="nav-link active" href="#home">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#about">About Us</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-danger" type="submit">🔍</button>
          </form>
        </div>
      </nav>

      {/* 2. Banner / Slider Section (Sử dụng 5 ảnh xoay vòng qua nút bấm < và >) */}
      <header 
        className="position-relative text-center text-white py-5 d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bannerImages[currentIdx]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '450px',
          transition: 'background-image 0.5s ease-in-out'
        }}
      >
        {/* Nút mũi tên trái */}
        <button 
          onClick={handlePrev}
          className="position-absolute start-0 ms-3 btn btn-dark text-white rounded-circle fs-4 px-3 py-1 opacity-75" 
          style={{ zIndex: 2 }}
        >
          &lt;
        </button>

        {/* Nội dung Banner */}
        <div className="container p-4 rounded" style={{ zIndex: 1 }}>
          <h1 className="display-4 fw-bold text-white mb-3">Neapolitan Pizza</h1>
          <p className="lead text-light">If you are looking for traditional Italian pizza, the Neapolitan is the best option!</p>
        </div>

        {/* Nút mũi tên phải */}
        <button 
          onClick={handleNext}
          className="position-absolute end-0 me-3 btn btn-dark text-white rounded-circle fs-4 px-3 py-1 opacity-75" 
          style={{ zIndex: 2 }}
        >
          &gt;
        </button>
      </header>

      {/* 3. Our Menu Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4 fw-bold">Our Menu</h2>
        <div className="row g-4">
          
          {/* Món 1 */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card bg-secondary text-light h-100 position-relative border-0 shadow">
              <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2 px-2 py-1">SALE</span>
              <img src={menu1} className="card-img-top" alt="Margherita Pizza" style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold">Margherita Pizza</h5>
                  <p className="card-text text-warning mb-3">
                    <del className="text-muted me-2">$40.00</del> $24.00
                  </p>
                </div>
                <button className="btn btn-dark w-100 fw-bold">Buy</button>
              </div>
            </div>
          </div>

          {/* Món 2 */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card bg-secondary text-light h-100 position-relative border-0 shadow">
              <img src={menu2} className="card-img-top" alt="Mushroom Pizza" style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold">Mushroom Pizza</h5>
                  <p className="card-text text-warning mb-3">$25.00</p>
                </div>
                <button className="btn btn-dark w-100 fw-bold">Buy</button>
              </div>
            </div>
          </div>

          {/* Món 3 */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card bg-secondary text-light h-100 position-relative border-0 shadow">
              <span className="badge bg-success text-white position-absolute top-0 start-0 m-2 px-2 py-1">NEW</span>
              <img src={menu3} className="card-img-top" alt="Hawaiian Pizza" style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold">Hawaiian Pizza</h5>
                  <p className="card-text text-warning mb-3">$30.00</p>
                </div>
                <button className="btn btn-dark w-100 fw-bold">Buy</button>
              </div>
            </div>
          </div>

          {/* Món 4 */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card bg-secondary text-light h-100 position-relative border-0 shadow">
              <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2 px-2 py-1">SALE</span>
              <img src={menu4} className="card-img-top" alt="Pesto Pizza" style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold">Pesto Pizza</h5>
                  <p className="card-text text-warning mb-3">
                    <del className="text-muted me-2">$50.00</del> $35.40
                  </p>
                </div>
                <button className="btn btn-dark w-100 fw-bold">Buy</button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Book Your Table Section */}
      <section className="container my-5 pb-5">
        <h2 className="text-center mb-4 fw-bold">Book Your Table</h2>
        <form className="row g-3 justify-content-center" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Your Name *" required />
          </div>
          <div className="col-md-4">
            <input type="email" className="form-control" placeholder="Your Email *" required />
          </div>
          <div className="col-md-4">
            <select className="form-select" defaultValue="">
              <option value="" disabled>Select a Service</option>
              <option value="dine-in">Dine In</option>
              <option value="takeaway">Take Away</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          <div className="col-md-12">
            <textarea className="form-control" rows="4" placeholder="Please write your comment" required></textarea>
          </div>
          <div className="col-md-12 text-center mt-4">
            <button type="submit" className="btn btn-warning px-5 fw-bold text-dark">Send Message</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default App;