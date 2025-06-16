import React, { useContext, useEffect, useState } from "react";
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
import UpdateProduct from "./components/updateProduct";
import Header from "./components/Header";
import { AuthContext } from "./Context/AuthProvider";
import Login from "./components/Auth/Login";
import { setLocalStorage } from "./utils/Localstorage";
import ShopkeeperDashboard from "./components/Dashboard/ShopkeeperDashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const authData = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Set shopkeepers in localStorage once
  useEffect(() => {
    setLocalStorage()
  }, []);

  useEffect(() => {
    if (user && location.pathname === "/Login") {
      navigate("/ShopkeeperDashboard");
    }
  }, [user, navigate, location.pathname]);

  const handleLogin = (email, password) => {
    const storedShopkeepers = JSON.parse(localStorage.getItem("shopkeepers") || "[]");
    const shopkeeper = storedShopkeepers.find(
      (e) => e.email === email && e.password === password
    );

    if (shopkeeper) {
      setUser(shopkeeper.email);
      setLoggedInUserData(shopkeeper);
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "shopkeeper" }));
    } else {
      alert("Invalid Credentials");
    }
  };

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedIn?.role === "shopkeeper") {
      setUser("shopkeeper");
    }
  }, []);

  return (
    <>
      <Header />
      {user && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/Login"
          element={!user ? <Login handleLogin={handleLogin} /> : " "}
        />
        {user && <Route path="/ShopkeeperDashboard" element={<ShopkeeperDashboard changeUser ={setUser} data={loggedInUserData} />} />}
        {user && <Route path="/NewProduct" element={<NewProduct />} />}
        <Route path="/Remove/:id" element={<Remove />} />
        {user && <Route path="/Products" element={<Products data = {loggedInUserData} />} />}
        <Route path="/Search" element={<Search />} />
        <Route path="/update/:productId" element={<UpdateProduct />} />
        <Route path="/About" element={<About />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TermsOfService" element={<TermsOfService />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>
    </>
  );
};

export default App;
