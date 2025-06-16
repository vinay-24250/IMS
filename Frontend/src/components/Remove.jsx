import axios from "axios";
import React, { useState } from "react";

const Remove = () => {
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
        headers: { "Content-Type": "application/json" },
      });
      setProductId("");
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
    <div className="min-h-screen bg-gradient-to-br from-teal-200 via-teal-300 to-teal-400 flex flex-col items-center justify-start py-16 px-4 font-serif">
      <div className="bg-white bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-xl w-full text-center">
      <h2 className="text-3xl font-bold text-teal-900 mb-6 tracking-wide">
          Remove Product
        </h2>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full h-12 px-5 rounded-lg text-lg text-gray-700 placeholder-gray-500 border border-teal-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
        />
<div className="gap-3 flex justify-center">
        <button
          onClick={fetchProduct}
          className={`w-60 mt-6 h-12 rounded-lg text-lg font-semibold text-white ${
            loading
              ? "bg-gray-400 w-60 cursor-not-allowed"
              : "bg-teal-700 w-60 hover:bg-teal-800 hover:scale-105 transition"
          }`}
        >
          {loading ? "Searching..." : "Fetch Product"}
        </button>

          <button
            onClick={handleDelete}
            disabled={!product || loading ||product.productId!=productId}
            className={`${
              product
                ? "bg-teal-700 w-60 hover:bg-teal-800 hover:scale-105 transition"
                : "bg-gray-400 w-60 cursor-not-allowed"
            } w-60 mt-6 h-12 rounded-lg text-lg font-semibold text-white`}
          >
            {loading ? "Deleting..." : "Remove Product"}
          </button>
          </div>
      </div>

      {product && (
        <table className="w-[800px] mt-16 border-black">
          <tr className="h-10 bg-gray-400">
            <th className="font-sans text-start px-4 border-x-4">Product ID</th>
            <th className="font-sans text-start px-4 border-x-4">
              Product Name
            </th>
            <th className="font-sans text-start px-4 border-x-4">Price</th>
            <th className="font-sans text-start px-4 border-x-4">Rating</th>
            <th className="font-sans text-start px-4 border-x-4">Quantity</th>
            <th className="font-sans text-start px-4 border-x-4">Category</th>
          </tr>
          <tr className="h-10">
            <td className="font-sans text-start px-4 border-x-4 bg-white">
              {product.productId}
            </td>
            <td className="font-sans text-start px-4 border-x-4 bg-white">
              {product.productName}
            </td>
            <td className="font-sans text-start px-4 border-x-4 bg-white">
              {product.price}
            </td>
            <td className="font-sans text-start px-4 border-x-4 bg-white">
              {product.rating}
            </td>
            <td className="font-sans text-start px-4 border-x-4 bg-white">
              {product.quantity}
            </td>
            <td className="font-sans text-start px-4 border-x-4 bg-white">
              {product.category}
            </td>
          </tr>
        </table>
      )}
  
      {message && (
        <p className="text-red-700 text-xl font-serif mt-6">{message}</p>
      )}
    </div>
    </>
  );
};

export default Remove;
