import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./pages/Auth/Login";
import Navbar from "./components/Headers/Navbar";
//import Signup from "./pages/Auth/Signup";
import ProductList from "./components/Product/ProductList";
import IndividualProduct from "./components/Product/IndividualProduct";
import CategoryState from "./context/CategoryState";
import Login from "./Login";
import Signup from "./Signup";
import AuthState from "./context/AuthState";
import Footer from "./components/Footer/Footer";
import React, {useEffect, useState} from "react";
import Store from "./components/Store/Store";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import StorePage from "./pages/store/StorePage";
import Cart from "./pages/cart/Cart";
import Shipping from "./pages/shipping/Shipping";
import Orders from "./pages/order/Orders";
import OrderDetails from "./components/checkout/OrderDetails";


function App() {

  const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
      fetch("/api").then(
        Response => Response.json()
      ).then(
        data => {
        setBackendData(data)
        }
      )
    },  [])

  return (
    <>
    <ShoppingCartProvider>
    <AuthState>
      <CategoryState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-details/:id" element={<OrderDetails/>} />            
            <Route path="/store" element={<StorePage />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<IndividualProduct />} />
            <Route path="/product/:id" element={<IndividualProduct />} />
            
          </Routes>
          <Footer />
        </BrowserRouter>
      </CategoryState>
      </AuthState>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
