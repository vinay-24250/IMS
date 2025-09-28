/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Footer from "./Footer";
import { motion } from "framer-motion";
import HomeCards from "./HomeCards";
import Login from "./Auth/Login";
import { Link, useNavigate } from "react-router-dom";

const HomePage = ({ data }) => {
  const navigate = useNavigate();

  const MotionLink = motion(Link);
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gray-800 h-auto flex flex-col justify-center items-center text-center px-5">
        <div className="flex flex-col md:flex-row justify-center items-center py-20 gap-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-['Poppins'] font-extrabold text-4xl sm:text-5xl md:text-6xl text-yellow-200 hover:scale-105 transition duration-500">
              Smarter Inventory, Faster Decisions
            </h2>
            <h2 className="font-['Poppins'] mb-10 font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-300 mt-3 hover:scale-105 transition duration-500">
              Your All-in-One Solution for Effortless Management
            </h2>
            <MotionLink
              to="/Login"
              whileHover={{ scale: 0.7 }}
              whileTap={{ scale: 0.6 }}
              className="px-6 py-3 text-lg font-semibold
              bg-yellow-200 rounded-lg hover:bg-yellow-400 hover:scale-105"
            >
              Get Started
            </MotionLink>
          </motion.div>

          <motion.img
            className="object-contain h-96 drop-shadow-lg hover:scale-105 transition-transform"
            src="src/components/IMS_Home.png"
            alt="IMS"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <HomeCards />
      </div>
    </>
  );
};

export default HomePage;
