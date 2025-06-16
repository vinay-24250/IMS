import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProduct = async () => {
    if (!productId) {
      setMessage("Please enter a Product ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/fetchById/${productId}`
      );

      if (!response.data) {
        setMessage("Product does not exist.");
        setTimeout(() => setMessage(""), 2000);
        return;
      }

      setProduct(response.data);
    } catch (error) {
      setProduct(null);
      setMessage("Product not found. Please check the ID.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 via-teal-300 to-teal-400 flex flex-col items-center justify-start py-16 px-4 font-serif">
      <div className="bg-white bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-xl w-full text-center">
        <h2 className="text-3xl font-bold text-teal-900 mb-6 tracking-wide">
          🔍 Search Product
        </h2>

        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full h-12 px-5 rounded-lg text-lg text-gray-700 placeholder-gray-500 border border-teal-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
        />

        <button
          onClick={fetchProduct}
          className={`w-full mt-6 h-12 rounded-lg text-lg font-semibold text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-700 hover:bg-teal-800 hover:scale-105 transition"
          }`}
        >
          {loading ? "Searching..." : "Search"}
        </button>

        {message && (
          <p className="mt-4 text-red-700 font-medium">{message}</p>
        )}
      </div>

      {product && (
        <div className="w-full max-w-5xl mt-10 bg-white bg-opacity-80 rounded-xl shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-600 text-white text-md">
                <th className="px-6 py-3">Product ID</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Supplier Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-teal-50 border-t">
                <td className="px-6 py-4">{product.productId}</td>
                <td className="px-6 py-4">{product.productName}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.rating}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.supplierContact}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Search;
