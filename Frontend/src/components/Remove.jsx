import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";

const Remove = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {authToken} = useContext(AuthContext)
  const fetchProduct = async () => {
    if (!productId) {
      setMessage("Please enter a Product ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/fetchById/${productId}` ,
         {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data) {
        setMessage("This Product ID does not exist. Please check and try again!");
        setProduct(null)
        setTimeout(() => {
          setMessage("");
        }, 2000);
        return;
      }
      setProduct(response.data);
    } catch (error) {
      setProduct(null);
      setMessage("Error Finding the product.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  

  const handleDelete = async () => {
    if (!productId) {
      alert("Enter valid Id");
      return;
    }

    if (!product) {
      alert("No product found with this ID. Fetch the product first.");
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/api/products/${productId}`, {
        headers: 
        { 
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json" },
      });
      setProductId("");
      setMessage("Product deleted successfully")
      setProduct(null)
    } catch (error) {
      setMessage("Error deleting product. Try again.");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-start py-16 px-4 font-serif">
      <div className="bg-gray-500 bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-xl w-full text-center">
      <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">
          Remove Product
        </h2>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full h-12 px-5 rounded-lg text-lg text-gray-700 placeholder-gray-500 border border-yellow-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
<div className="gap-3 flex justify-center">
        <button
          onClick={fetchProduct}
          className={`w-60 mt-6 h-12 rounded-lg text-lg font-semibold text-black ${
            loading
              ? "bg-gray-400 w-60 cursor-not-allowed"
              : "bg-yellow-200 w-60 hover:bg-yellow-400 hover:scale-105 transition"
          }`}
        >
          {loading ? "Searching..." : "Fetch Product"}
        </button>

          <button
            onClick={handleDelete}
            disabled={!product || loading ||product.productId!=productId}
            className={`${
              product
                ? "bg-yellow-200 w-60 hover:bg-yellow-400 hover:scale-105 transition"
                : "bg-gray-400 w-60 cursor-not-allowed"
            } w-60 mt-6 h-12 rounded-lg text-lg font-semibold`}
          >
            {loading ? "Deleting..." : "Remove Product"}
          </button>
          </div>
      </div>

      {product && (
        <div className="w-full max-w-5xl mt-10 bg-white bg-opacity-80 rounded-xl shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-yellow-200  text-md">
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
  
      {message && (
        <p className="text-red-700 text-xl font-serif mt-6">{message}</p>
      )}
    </div>
    </>
  );
};

export default Remove;
