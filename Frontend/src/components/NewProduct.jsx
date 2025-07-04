import React, { useContext, useState } from "react";
import axios from "axios";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../Context/AuthProvider";

const NewProduct = () => {

  const [productName, setProductName] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplierContact, setSupplierContact] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const {authToken} = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      
      !productName ||
      !rating ||
      !price ||
      !category ||
      !quantity ||
      !supplierContact
    ) {
      setMessage("Please fill all fields");
      setMessageType("error");
      return;
    }

    const newProduct = {
      productName,
      rating,
      price,
      category,
      quantity,
      supplierContact,
    };

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/products/new",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Product added:", response.data);
      setMessage("✅ Product added successfully!");
      setMessageType("success");

      setProductName("");
      setRating(0);
      setPrice("");
      setCategory("");
      setQuantity("");
      setSupplierContact("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage("❌ Product with this ID already exists.");
      } else {
        setMessage("❌ Failed to add product.");
      }
      setMessageType("error");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 via-teal-300 to-teal-400 flex flex-col items-center justify-start py-16 px-4 font-serif">
      <div className="bg-white bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-[1000px] w-full text-center h-[590px]">
        <div className="h-16 w-auto flex justify-center items-center py-10">
          <h2 className="text-3xl font-bold text-teal-900 mb-6 tracking-wide">
            📦 Add Product 📦
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-10 px-5 mt-5 mb-2"
        >
        
          <input
            className="w-full h-12 px-5 rounded-lg text-lg text-gray-700 placeholder-gray-500 border border-teal-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            type="text"
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <div className="bg-white flex place-items-center w-full h-12 px-5 rounded-lg text-lg text-gray-700 placeholder-gray-500 border border-teal-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-600 transition">
            <span className="">Rating :</span>
            {[1, 2, 3, 4, 5].map((index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={`text-md cursor-pointer transition ml-2 ${
                  index <= rating ? "text-yellow-300" : "text-gray-400"
                }`}
                onClick={() => setRating(index)}
              />
            ))}
          </div>
          <input
            className="w-full h-12 px-5 rounded-lg text-lg text-gray-700 placeholder-gray-500 border border-teal-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="w-full h-12 px-5 rounded-lg text-lg text-gray-700 placeholder-gray-500 border border-teal-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            className="w-full h-12 px-5 rounded-lg text-lg text-gray-700 placeholder-gray-500 border border-teal-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            className="w-full h-12 px-5 rounded-lg text-lg text-gray-700 placeholder-gray-500 border border-teal-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            type="tel"
            maxLength="10"
            pattern="\d{10}"
            placeholder="Supplier Contact"
            value={supplierContact}
            onChange={(e) => setSupplierContact(e.target.value)}
          />
        </form>

        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-teal-800 max-w-60 text-white font-semibold font-serif text-md h-10 flex justify-center place-items-center transition delay-150 duration-300 ease-in-out my-11 rounded-lg hover:-translate-y-1 hover:scale-110 hover:bg-teal-900 hover:text-white"
          >
            {loading ? "Adding Product..." : "ADD PRODUCT"}
          </button>
        </div>
      </div>

      {message && (
        <p
          className={`h-10 px-10 text-center mb-2 rounded-lg text-lg flex place-items-center font-semibold mt-4 ${
            messageType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default NewProduct;
