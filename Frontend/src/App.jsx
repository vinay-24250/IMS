import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import NewProduct from "./components/NewProduct";
import Remove from "./components/Remove";
import Products from "./components/Products";
import Search from "./components/Search";
import About from "./Pages/About";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfService from "./Pages/TermsofService";
import ContactUs from "./Pages/ContactUs";
import UpdateProduct from "./components/UpdateProduct";
import Header from "./components/Header";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ShopkeeperDashboard from "./components/Dashboard/ShopkeeperDashboard";

import { AuthContext } from "./Context/AuthProvider";
import Footer from "./components/Footer";

const App = () => {
  const { currentUser, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser && location.pathname === "/login") {
      navigate("/ShopkeeperDashboard");
    }
  }, [currentUser, location.pathname, navigate]);

  return (
    <>
      <Header />
      {currentUser && <Navbar logout={logout} />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!currentUser ? <Login login={login} /> : null} />
        <Route path="/signup" element={<Signup />} />

        {currentUser && <Route path="/ShopkeeperDashboard" element={<ShopkeeperDashboard />} />}
        {currentUser && <Route path="/NewProduct" element={<NewProduct />} />}
        {currentUser && <Route path="/Products" element={<Products />} />}
        {currentUser && <Route path="/update/:productId" element={<UpdateProduct />} />}
        {currentUser && <Route path="/Remove" element={<Remove />} />}

        <Route path="/Search" element={<Search />} />
        <Route path="/About" element={<About />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TermsOfService" element={<TermsOfService />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
