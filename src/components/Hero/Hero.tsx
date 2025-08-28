"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
function Hero() {
  return (
    <>
      <div
        className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/Home-page.jpg')" }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content container - above overlay */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
          

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl sm:text-6xl font-extrabold drop-shadow-lg"
          >
            Welcome to KarmaShop!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-gray-300 mt-6 text-lg sm:text-xl max-w-xl drop-shadow-md"
          >
            Discover authentic products with reviews powered by our karma system.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full shadow-lg transition"
          >
            <Link href="/products">
            Shop Now
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Hero;
