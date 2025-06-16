import React from "react";
import { useNavigate } from "react-router-dom";

const ShopkeeperDashboard = (props) => {
  const navigate = useNavigate();

  if (!props.changeUser) return null;

  const logOut = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    props.changeUser('')
    // window.location.reload();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-300">
      <h1 className="text-2xl font-bold mb-4 text-center text-indigo-700">Shopkeeper Dashboard</h1>

      <div className="text-lg text-gray-700 mb-4">
        <p><span className="font-semibold">Email:</span> {props.data.email}</p>
      </div>

      <button
        onClick={logOut}
        className="w-full mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default ShopkeeperDashboard;
