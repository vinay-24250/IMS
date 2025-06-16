import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password)
    console.log(email, password);


    setEmail("");
    setPassword("");
    
  };

  return (
    <div className="flex  justify-center h-screen w-screen bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400">
      <div className="bg-white shadow-xl rounded-3xl p-8 mt-32 h-[350px] w-[90%] max-w-md flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter your email"
            className="rounded-full px-4 py-3 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter your password"
            className="rounded-full px-4 py-3 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
          />
          <button
            type="submit"
            className="bg-teal-600 text-white py-2 rounded-full text-sm font-semibold hover:bg-teal-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-6">
          Don't have an account? <a href="/signup" className="text-teal-700 font-medium hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
