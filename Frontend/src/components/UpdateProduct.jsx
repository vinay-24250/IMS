import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    price: "",
    rating: "",
    category: "",
    quantity: "",
    supplierContact: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/api/products/fetchById/${productId}`
        );
        if (res.data) {
          setProduct(res.data);
        } else {
          setMessage("⚠️ Product not found.");
          setMessageType("error");
        }
      } catch (err) {
        setMessage("❌ Failed to fetch product.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.put(
        `http://localhost:8080/api/products/update/${productId}`,
        product,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage("✅ Product updated successfully!");
      setMessageType("success");
      setTimeout(() => {
        navigate("/Products");
      }, 1000);
    } catch (err) {
      setMessage("❌ Update failed. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-md border border-gray-300 bg-neutral-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500";

  return (
    <div className="bg-gradient-to-r from-teal-100 via-teal-300 to-teal-400 min-h-screen flex justify-center pt-5 ">
      <div className="bg-white rounded-2xl shadow-xl h-full w-full max-w-xl p-4 mt-7 font-sans border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-teal-800 mb-6">
          Update Product
        </h2>

        {message && (
          <div
            className={`text-center py-2 px-4 mb-4 rounded-lg text-sm font-semibold ${
              messageType === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "productName", label: "Product Name" },
            { name: "price", label: "Price", type: "number" },
            { name: "rating", label: "Rating", type: "number", min: 1, max: 5 },
            { name: "category", label: "Category" },
            { name: "quantity", label: "Quantity", type: "number" },
            { name: "supplierContact", label: "SupplierContact", type: "number" ,min: 10 , maxl: 10 },
          ].map(({ name, label, type = "text", min, max }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={product[name]}
                onChange={handleChange}
                min={min}
                max={max}
                required
                className={inputClass}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition duration-200 text-lg font-semibold"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
