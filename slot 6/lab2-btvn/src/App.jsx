
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/NavbarComponent';
import BannerComponent from './components/BannerComponent';
import MenuSection from './components/MenuSection';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <div className="bg-black min-vh-100">
      <NavbarComponent />
      <BannerComponent />
      <MenuSection />
      <BookingForm />
    </div>
  );
}

export default App;