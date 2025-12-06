import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Contact from "./Contact";
import Cart from "./Cart";
import Orders from "./Orders";
import Register from "./Register";
import Login from "./Login";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    // Allow Register & Login without token
    if (!token) {
      if (currentPath !== "/register" && currentPath !== "/login") {
        navigate("/register");
      }
    }
  }, [navigate]);

  return (
    <>
      <ToastContainer />

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-area">
          <img src="backgroundimgae.jpeg" className="logo" alt="App Logo" />
        </div>

        <div className="menu-area">
          <Link to="/home" className="nav-link">🍽️ Home</Link>
          <Link to="/veg" className="nav-link">🥦 Veg</Link>
          <Link to="/nonveg" className="nav-link">🍗 Nonveg</Link>
          
          <Link to="/contact" className="nav-link">📞 Contact</Link>
          <Link to="/orders" className="nav-link">Orders</Link>
          <Link to="/register" className="nav-link">📝 Register</Link>
          <Link to="/login" className="nav-link">🔑 Login</Link>
        </div>

        <div className="cart-area">
          <Link to="/cart" className="nav-link">🛒 Cart ({cartCount})</Link>
        </div>
      </nav>

      {/* SCROLLING BANNER */}
      <div className="scroll-banner">
        <div className="scroll-text">WELCOME TO SRI FOODS 🍽️</div>
      </div>

      {/* MAIN CONTENT */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Register />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<Nonveg />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
