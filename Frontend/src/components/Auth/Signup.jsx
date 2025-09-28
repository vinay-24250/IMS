import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { handleSignup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const [message, setMessage] = useState('')
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    const success = await handleSignup({ businessName, ownerName, email, password } ,setMessage);

    if (success) {
      console.log("sucess")
      navigate("/Login");
    } else {
      console.log(error)
      setError("❌ Signup failed. Please check your details or try again.");
    }

  
    setBusinessName("");
    setOwnerName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center h-screen w-screen bg-gray-800">
      <div className="bg-gray-300 shadow-2xl rounded-3xl p-8 mt-20 h-[500px] w-[90%] max-w-md flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-600 font-medium text-center mb-4">{error}</p>
        )}

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            type="text"
            placeholder="Business Name"
            className="rounded-full px-4 py-3 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
          />
          <input
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
            type="text"
            placeholder="Owner Name"
            className="rounded-full px-4 py-3 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Email Address"
            className="rounded-full px-4 py-3 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Password"
            className="rounded-full px-4 py-3 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
          />
          <button
            type="submit"
            className="bg-yellow-200 py-2 rounded-full text-sm font-semibold hover:bg-yellow-400 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-800 font-medium hover:underline">
            Login
          </Link>
        </p>
        {message}
      </div>
    </div>
  );
};

export default Signup;
