import Navbar from './components/navbar/Navbar.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Shop from './pages/Shop.jsx';
import ShopCategory from './pages/ShopCategory.jsx';
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import men_banner from './components/assets/banner_mens.png';
import women_banner from './components/assets/banner_women.png';
import kids_banner from './components/assets/banner_kids.png';
import LoginSignup from './pages/LoginSignup.jsx';
import Footer from './components/footer/footer.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/Men' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/Women' element={<ShopCategory banner={women_banner} category="Women"/>}/>
        <Route path='/Kids' element={<ShopCategory banner={kids_banner} category="kids" />}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
