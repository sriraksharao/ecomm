"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewSection() {
 const reviews = [
  {
    id: 1,
    user: "John Doe",
    rating: 5,
    comment:
      "This website completely transformed how I shop online. The smooth navigation and helpful features made my experience enjoyable and stress-free!",
  },
  {
    id: 2,
    user: "Jane Smith",
    rating: 4,
    comment:
      "I loved the website’s intuitive design and how easy it was to find exactly what I needed. It saved me so much time and hassle.",
  },
  {
    id: 3,
    user: "Alice Johnson",
    rating: 4,
    comment:
      "The site’s fast loading times and clear information helped me make better decisions and trust the platform fully.",
  },
];

  const Star = ({ filled }:any) => (
    <svg
      className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.385 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L3.613 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
    </svg>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className=" mx-auto p-6 min-h-screen bg-gray-50 z-50 relative">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">What People Say About Our Website</h2>

      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView={"visible"}
      >
        {reviews.map(({ id, user, rating, comment }) => (
          <motion.div
            key={id}
            variants={cardVariants}
            className="p-5 bg-white rounded-xl shadow-md border border-gray-200"
          >
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="font-semibold text-lg text-gray-800">{user}</h3>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} filled={i < rating} />
                ))}
              </div>
            </div>
            <p className="text-gray-600 italic">"{comment}"</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
