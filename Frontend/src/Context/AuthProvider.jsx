import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Auth Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [currentUser, setCurrentUser] = useState(null);

  // Decode JWT to get email
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const fetchUserData = async (token) => {
  try {
    const [userRes, productRes] = await Promise.all([
      axios.get("http://localhost:8080/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://localhost:8080/api/products/my-products", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    const userData = userRes.data;
    const products = productRes.data;
console.log(userData)
    setCurrentUser({
      email: userData.email,
      ownerName: userData.ownerName,
      businessName: userData.businessName,
      products,
    });
  } catch (error) {
    setMessage("Token expired")
    console.error("Token invalid or expired:", error);
    logout();
  }
};

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      console.log("Login response:", res.data);
      let token = res.data.token;

     
      if (token.startsWith("Bearer ")) {
        token = token.substring(7); 
      }

      localStorage.setItem("authToken", token);
      setAuthToken(token);

      await fetchUserData(token);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };
const handleSignup = async ({ businessName, ownerName, email, password }, setMessage) => {
  try {
    const response = await axios.post("http://localhost:8080/register", {
      businessName,
      ownerName,
      email,
      password,
    });

    if (response.status === 200 || response.status === 201) {
      setMessage("✅ Registration successful! Please login.");
      return true;
    } else {
      setMessage("⚠️ Something went wrong. Try again.");
      return false;
    }
  } catch (error) {
    console.error("Signup failed:", error);
    if (error.response?.status === 409) {
      setMessage("❌ Email already exists.");
    } else {
      setMessage("❌ Signup failed. Please try again.");
    }
    return false; 
  }
};

  // Logout handler
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setCurrentUser(null);
  };

  // Run on mount and whenever token changes
  useEffect(() => {
    if (authToken) {
      fetchUserData(authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, authToken , handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;