
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import SobreNosotros from './components/SobreNosotros/SobreNosotros';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart'
import CheckoutForm from './components/CheckoutForm/CheckoutForm'
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/sobreNosotros" element={<SobreNosotros />}/>
          <Route path="/category/:categoryId" element={<ItemListContainer />}/>
          <Route path="/item/:itemId" element={<ItemDetailContainer />}/>
          <Route path="/Cart" element={<Cart />}/>
           <Route path="/CheckoutForm" element={<CheckoutForm />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>     
  )
}

export default App
