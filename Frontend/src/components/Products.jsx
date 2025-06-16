
import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const Products = ({data}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/all")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Failed to load products");
        setLoading(false);
      });

    const timeout = setTimeout(() => {
      setMessage("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const generateReport = () => {
    const filteredProducts = showLowStockOnly
      ? products.filter((p) => p.quantity < lowStockThreshold)
      : products;

    if (filteredProducts.length === 0) {
      alert("No products available for report.");
      return;
    }

    const doc = new jsPDF();
  
    doc.text(!showLowStockOnly ? "Inventory Report" : "Low Stock Inventory Report", 80, 10);
    if(showLowStockOnly){
      
    }
    const tableColumn = [
      "Product ID",
      "Name",
      "Price",
      "Rating",
      "Quantity",
      "Category",
      "Supplier Contact",
    ];
    const tableRows = filteredProducts.map((item) => [
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
      theme: "striped",
      headStyles: {
        fillColor: [13, 148, 136],
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
      },
      bodyStyles: {
        halign: "center",
        textColor: 50,
        fontSize: 10,
      },
      alternateRowStyles: {
        fillColor: [240, 255, 250],
      },
      styles: {
        cellPadding: 4,
        font: "helvetica",
        lineColor: 200,
        lineWidth: 0.1,
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 40 },
        2: { cellWidth: 25 },
        3: { cellWidth: 20 },
        4: { cellWidth: 25 },
        5: { cellWidth: 30 },
        6: { cellWidth: 35 },
      },
      didDrawPage: (data) => {
        // Header
        doc.setFontSize(16);
        doc.setTextColor(40);
        doc.text("Product Inventory Report", data.settings.margin.left, 20);
  
        // Timestamp
        doc.setFontSize(10);
        const date = new Date().toLocaleString();
        doc.setTextColor(100);
        doc.text(`Generated on: ${date}`, data.settings.margin.left, 26);
      },
    });
  

    doc.save("products_report.pdf");
  };

  const getRowClass = (quantity, index) => {
    if (quantity < lowStockThreshold) {
      return "bg-red-200 text-red-900 font-semibold";
    }
    return index % 2 === 0 ? "bg-gray-50" : "bg-white";
  };

  const lowStockCount = () =>
    products.filter((product) => product.quantity < lowStockThreshold).length;

  const filteredProducts = showLowStockOnly
    ? products.filter((p) => p.quantity < lowStockThreshold)
    : products;

  return (
    <div className="bg-gradient-to-tr from-teal-100 via-teal-200 to-teal-300 min-h-screen p-6 font-sans flex-col justify-center place-items-center">
      <h2 className="text-3xl font-bold text-center text-teal-800 mb-6 font-serif"> Welcome to your Inventory {data.email}</h2>
      <h2 className="text-3xl font-bold text-center text-teal-800 mb-6 font-serif">
        📦 Product Inventory
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <div className="w-64 backdrop-blur-md bg-white/60 border border-teal-300 shadow-lg rounded-xl px-6 py-4 flex items-center gap-4">
          <label className="text-teal-800 font-semibold text-sm">
            Stock Alert Limit:
          </label>
          <input
            type="number"
            min={10}
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(Number(e.target.value))}
            className="w-20 px-2 py-1 text-center border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <button
          onClick={() => setShowLowStockOnly(!showLowStockOnly)}
          className="w-64 backdrop-blur-md bg-white/60 border border-teal-300 shadow-lg rounded-xl py-5 flex justify-center  items-center p-6"
        >
          {showLowStockOnly ? "🔁 Show All Products" : "⚠️ View Low Stock Only"}
        </button>
      </div>

      {!showLowStockOnly && lowStockCount() > 0 && (
        <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 font-medium text-center py-2 px-4 rounded-full mb-4">
          ⚠️ {lowStockCount()} product(s) are low on stock!
        </div>
      )}

      <div className="overflow-x-auto max-w-6xl mx-auto shadow-lg rounded-xl">
        <table className="w-full text-sm text-center bg-white rounded-xl overflow-hidden">
          <thead className="bg-yellow-100 text-teal-900 shadow-sm sticky top-0 z-10">
            <tr>
              {[
                "Product ID",
                "Product Name",
                "Max. Retail Price",
                "Rating",
                "Quantity",
                "Category",
                "Supplier Contact",
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 font-semibold border-b border-gray-300"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product.productId}
                  className={`transition duration-150 ease-in-out hover:bg-yellow-50 ${getRowClass(
                    product.quantity,
                    index
                  )}`}
                >
                  <td className="px-3 py-2 border-b">{product.productId}</td>
                  <td className="px-3 py-2 border-b">{product.productName}</td>
                  <td className="px-3 py-2 border-b">₹ {product.price}</td>
                  <td className="px-3 py-2 border-b">{product.rating}</td>
                  <td className="px-3 py-2 border-b">
                    {product.quantity}
                    {product.quantity < lowStockThreshold && (
                      <span className="ml-1 text-red-600">⚠️</span>
                    )}
                  </td>
                  <td className="px-3 py-2 border-b">{product.category}</td>
                  <td className="px-3 py-2 border-b">
                    {product.supplierContact}
                  </td>
                  <td className="px-3 py-2 border-b">
                    <button
                      onClick={() => navigate(`/update/${product.productId}`)}
                      className="bg-yellow-200 text-teal-800 text-xs px-4 py-1 rounded-md hover:bg-teal-600 hover:text-white transition"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-red-600 py-6 font-medium"
                >
                  No {showLowStockOnly ? "low stock" : ""} products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={generateReport}
          className="bg-teal-700 w-44 px-6 py-2 text-white text-sm font-semibold rounded-xl shadow-lg transition hover:-translate-y-1 hover:scale-105 hover:bg-teal-800"
        >
          📄 {showLowStockOnly ? "Low Stock Report" : "Stock Report"}
        </button>
      </div>
    </div>
  );
};

export default Products;
