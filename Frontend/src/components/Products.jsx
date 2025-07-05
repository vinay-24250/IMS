
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  const { authToken, currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products/my-products", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setMessage("Session expired. Please login again.");
          logout();
          navigate("/login");
        } else {
          setMessage("Failed to load products.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const timeout = setTimeout(() => {
      setMessage(null);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [authToken, navigate, logout]);

  const generateReport = () => {
    const filtered = showLowStockOnly
      ? products.filter((p) => p.quantity < lowStockThreshold)
      : products;

    if (filtered.length === 0) {
      alert("No products available for report.");
      return;
    }

    const doc = new jsPDF();
    doc.text(!showLowStockOnly ? "Inventory Report" : "Low Stock Report", 80, 10);

    const tableColumn = [
      "Product ID",
      "Name",
      "Price",
      "Rating",
      "Quantity",
      "Category",
      "Supplier Contact",
    ];
    const tableRows = filtered.map((item) => [
      item.productId,
      item.productName,
      item.price,
      item.rating,
      item.quantity,
      item.category,
      item.supplierContact,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("products_report.pdf");
  };

  const filteredProducts = showLowStockOnly
    ? products.filter((p) => p.quantity < lowStockThreshold)
    : products;

  const getRowClass = (quantity, index) => {
    if (quantity < lowStockThreshold) return "bg-red-200 text-red-900 font-semibold";
    return index % 2 === 0 ? "bg-gray-50" : "bg-white";
  };

  if (loading) return <p className="text-center mt-10 text-teal-600">Loading products...</p>;

  return (
    <div className="bg-gray-800 gap-5 min-h-screen flex flex-col place-items-center ">
      
    
      {message && <div className="text-center text-red-600 mb-4">{message}</div>}

    
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <div className="w-64 h-20 bg-white/60 border border-yellow-300 shadow-lg rounded-xl mt-20 px-6 py-4 flex items-center justify-center gap-4">
          <label className=" font-semibold text-sm">
            Stock Alert Limit:
          </label>
          <input
            type="number"
            min={10}
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(Number(e.target.value))}
            className="w-20 px-2 py-1 border border-teal-300 rounded-md"
          />
        </div>
   <div className="w-40 h-20 mt-20">

      <button
          onClick={() => setShowLowStockOnly(!showLowStockOnly)}
          className="w-64 h-20 bg-white/60 border border-yellow-300 hover:bg-yellow-200 shadow-lg rounded-xl py-3  font-medium"
        >
          {showLowStockOnly ? "🔁 Show All Products" : "⚠️ View Low Stock Only"}
        </button>
   </div>
      
      </div>


      <div className="overflow-x-auto max-w-6xl mx-auto shadow-lg rounded-xl">
        <table className="w-full text-sm text-center bg-white rounded-xl">
          <thead className="bg-yellow-100 text-teal-900 sticky top-0 z-10">
            <tr>
              {[
                "Product ID",
                "Product Name",
                "Price",
                "Rating",
                "Quantity",
                "Category",
                "Supplier Contact",
                "Action",
              ].map((title) => (
                <th key={title} className="px-4 py-3">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product.productId} className={getRowClass(product.quantity, index)}>
                  <td className="px-3 py-2">{product.productId}</td>
                  <td className="px-3 py-2">{product.productName}</td>
                  <td className="px-3 py-2">₹ {product.price}</td>
                  <td className="px-3 py-2">{product.rating}</td>
                  <td className="px-3 py-2">
                    {product.quantity}
                    {product.quantity < lowStockThreshold && (
                      <span className="ml-1 text-red-600">⚠️</span>
                    )}
                  </td>
                  <td className="px-3 py-2">{product.category}</td>
                  <td className="px-3 py-2">{product.supplierContact}</td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => navigate(`/update/${product.productId}`)}
                      className="bg-yellow-200 text-teal-800 text-xs px-4 py-1 rounded-md hover:bg-yellow-400 transition"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-6 text-red-600 font-medium">
                  No products to show.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-10 w-40 place-items-center">
        <button
          onClick={generateReport}
          className="bg-yellow-200 w-44 px-6 py-2 text-sm font-semibold rounded-xl shadow-lg hover:bg-yellow-400 "
        >
          📄 {showLowStockOnly ? "Low Stock Report" : "Stock Report"}
        </button>
      </div>
    </div>
  );
};

export default Products;
