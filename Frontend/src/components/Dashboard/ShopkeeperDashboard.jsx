import React from "react";
import { useNavigate } from "react-router-dom";

const ShopkeeperDashboard = ({ data, changeUser }) => {
  const navigate = useNavigate();

  if (!changeUser) return null;

  const logOut = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("loggedInUser");
      changeUser('');
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="bg-indigo-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">
            {data?.email?.charAt(0)?.toUpperCase() || "S"}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome, Shopkeeper!</h1>
          <p className="text-gray-500 text-sm mb-6">Your dashboard overview</p>

          <div className="w-full text-left mb-6">
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Email:</span> {data?.email}
            </p>
          </div>

          <button
            onClick={logOut}
            className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;

