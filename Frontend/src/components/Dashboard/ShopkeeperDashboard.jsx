import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import {
  AlertTriangle,
  Boxes,
  Edit3,
  PlusCircle,
  Search,
  Trash2,
  User,
} from "lucide-react";

const ShopkeeperDashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!currentUser) return null;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center ml-32 py-10 bg-gray-800">
        <div>
          <h2 className="text-4xl font-semibold text-yellow-200">
            Welcome, {currentUser.businessName}!
          </h2>
          <p className="text-slate-300 text-xl">
            Manage your store and inventory here.
          </p>
        </div>
        <div className="w-20 mr-40">
          <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
        </div>
      </div>

      {/* Info Paragraph + Cards */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="mb-10">
          <p className="text-yellow-200 text-lg mb-2">
            Managing inventory doesn’t have to be complicated. Our Shopkeeper
            Dashboard gives you full control over your stock, reduces manual
            errors, and helps you make smarter business decisions in real-time.
            Whether you're adding new products or checking low stock alerts,
            everything is just a click away. Designed for simplicity, speed,
            and accuracy, this app makes store management effortless.
          </p>
          <h2 className="text-2xl font-semibold text-white">
            Your store, your rules — simplified.
          </h2>
        </div>
<div className="flex justify-evenly place-items-center h-[400px] w-full bg-gray-500 my-20 rounded-3xl">
       <div className="h-[320px] w-[300px] justify-around rounded-xl flex flex-col place-items-center bg-gray-200"><div><User className="w-16 h-16 text-indigo-600 mt-10" />
       </div><table className="min-w-[300px]   shadow-md overflow-hidden mb-10 transition-all">
  
  <tbody>
    <tr className="border-t">
      <td className="px-4 py-2 text-gray-600">Business Name</td>
      <td className="px-4 py-2 font-medium text-gray-800">{currentUser.businessName}</td>
    </tr>
    <tr className="border-t">
      <td className="px-4 py-2 text-gray-600">Owner Name</td>
      <td className="px-4 py-2 font-medium text-gray-800">{currentUser.ownerName}</td>
    </tr>
    <tr className="border-t">
      <td className="px-4 py-2 text-gray-600">Email</td>
      <td className="px-4 py-2 font-medium text-gray-800">{currentUser.email}</td>
    </tr>
  </tbody>
</table></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-[400px]">
          <DashboardCard title="All Products" to="/products" Icon={Boxes} />
          <DashboardCard title="Add Product" to="/NewProduct" Icon={PlusCircle} />
          <DashboardCard title="Delete Product" to="/Remove" Icon={Trash2} />
          <DashboardCard title="Search Product" to="/Search" Icon={Search} />
        </div>

        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, to, Icon }) => (
  <Link
    to={to}
    className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-center items-center text-center"
  >
    {Icon && <Icon className="w-10 h-10 text-indigo-600 mb-3" />}
    <h3 className="text-xl font-semibold text-indigo-700">{title}</h3>
    <p className="text-gray-500 text-sm mt-2">Go to {title}</p>
  </Link>
);

export default ShopkeeperDashboard;
