import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/ShopkeeperDashboard");
    } else {
      setError("Invalid credentials");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center h-screen bg-teal-100">
      <div className="bg-white shadow-xl rounded-3xl p-8 mt-32 w-full h-[400px] max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter your email"
            className="rounded-full px-4 py-3 bg-gray-100 border border-gray-300 focus:outline-none"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter your password"
            className="rounded-full px-4 py-3 bg-gray-100 border border-gray-300 focus:outline-none"
          />
          <button type="submit" className="bg-teal-600 text-white py-2 rounded-full font-semibold hover:bg-teal-700">
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-6">
          Don't have an account? <a href="/signup" className="text-teal-700 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
