import React, { useState } from "react";
import { motion } from "framer-motion";
import hostelImg from "../assets/hostel-front-img.jpg";
import Register from "../components/Register";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="h-screen w-full flex items-center justify-between px-20 bg-gray-900 text-white relative overflow-hidden">
      
      {/* Left Side Text */}
      <motion.div
        className="w-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Hostel Management System
        </h1>
        <p className="text-lg">
          Manage your hostel complaints and facilities efficiently.
        </p>
        <motion.button
          className="mt-6 px-6 py-3 bg-blue-600 rounded-lg text-white text-lg font-semibold hover:bg-blue-700"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Right Side Image Placeholder with 3D Shape */}
      <motion.div
        className="w-1/2 flex justify-center items-center relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-150 h-100   flex items-center justify-center shadow-lg shadow-blue-500/50 relative ">
          <img src={hostelImg} alt="hostel img" className="w-full h-full text-gray-400 object-fill rounded-2xl" />
        </div>
      </motion.div>
      
    </div>

  );
};

export default Home;