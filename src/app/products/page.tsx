"use client";
import React, { useState } from "react";
import data from "./mockData.json"; // Your products data
import ProductCard from "@/components/Product/ProductCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import { motion } from "framer-motion";
function Page() {
  // filters with arrays for multi-select brand and rating
  const [filters, setFilters] = useState({
    brand: [] as string[],
    rating: [] as number[],
    bestSeller: false,
    discount: null as number | null,
    deliveryDate: null as number | null,
  });

  const products = data;

  const filteredProducts = products.filter((p) => {
    // Brand filter - if no brands selected, pass all
    const brandMatch =
      filters.brand.length === 0 || filters.brand.includes(p.brand);

    // Rating filter - product rating must be >= any selected rating
    // If multiple ratings selected, show products matching any rating threshold selected (OR logic)
    const ratingMatch =
      filters.rating.length === 0 || filters.rating.some((r) => p.rating >= r);

    // Best Seller filter
    const bestSellerMatch = !filters.bestSeller || p.bestSeller;

    // Discount filter - product discount >= selected min discount
    const discountMatch =
      filters.discount === null || p.discount >= filters.discount;

    // Delivery date filter - product deliveryDate <= selected max deliveryDate
    const deliveryDateMatch =
      filters.deliveryDate === null || p.deliveryDate <= filters.deliveryDate;

    return (
      brandMatch &&
      ratingMatch &&
      bestSellerMatch &&
      discountMatch &&
      deliveryDateMatch
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="">
          <Sidebar filters={filters} setFilters={setFilters} />
        </div>
        {/* Product Grid */}
        <main className="lg:col-span-3">
          <div className="grid gap-8">
            {filteredProducts.length === 0 ? (
              <>
                <motion.div
                  className="flex justify-center items-center gap-5 text-gray-600 text-lg font-semibold "
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 10,
                    delay: 0.2,
                  }}
                  aria-live="polite"
                  role="alert"
                >
                  <p>Sorry, no products match your selected filters </p>
                  <button
                    onClick={() =>
                      setFilters({
                        brand: [],
                        rating: [],
                        bestSeller: false,
                        discount: null,
                        deliveryDate: null,
                      })
                    }
                    className="w-40 bg-red-600 text-sm p-2 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    aria-label="Clear all filters"
                  >
                    Clear Filters
                  </button>
                </motion.div>
                <div>
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
