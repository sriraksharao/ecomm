"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import data from "../../app/products/mockData.json"

function ProductCarousel() {
  const products = data;

  // Star icon SVG component for better visuals
  const Star = ({ filled }:any) => (
    <svg
      className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.385 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L3.613 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
    </svg>
  );

  return (
    <div className="relative min-h-screen bg-white text-black py-10">
      <h1 className="text-3xl font-extrabold mb-8 text-center tracking-wide">
        Featured Products
      </h1>

      <div
        className="flex p-5 overflow-x-auto scroll-smooth snap-x snap-mandatory gap-8 px-8 scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="
              snap-center
              flex-shrink-0
              w-72
              bg-white
              border border-gray-200
              rounded-xl
              shadow-md
              hover:shadow-lg
              cursor-pointer
              transition-shadow
              duration-300
              flex
              flex-col
              overflow-hidden
              relative
            "
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {product.bestSeller && <div className="absolute top-0 left-0 px-4 py-2 bg-yellow-400 text-white z-50">Best Seller</div>}
            <div className="relative w-full h-44 overflow-hidden rounded-t-xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                objectFit="cover"
                priority
              />
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {product.name}
              </h2>

              <div className="flex items-center mt-2 space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} filled={i < product.rating} />
                ))}
              </div>

              <p className="text-gray-600 text-sm mt-3 flex-grow">
                {product.description}
              </p>

              <div className="mt-4">
                <span className="text-xl font-extrabold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ProductCarousel;
