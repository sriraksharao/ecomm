"use client";
import React from "react";
import {
  MapPin,
  ShoppingCart,
  User2,
  PackageCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import data from "../../app/products/mockData.json"



function Navbar() {
  const {cartItems} = useCart();
  return (
    <div className="bg-[#131921] text-white px-6 py-3 flex items-center justify-between gap-4 text-sm sticky top-0 z-90">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Link href={"/"} className="font-bold text-xl text-yellow-400">KarmaShop</Link>
        <div className="flex items-center gap-1 cursor-pointer">
          <MapPin className="w-4 h-4 text-gray-300" />
          <span className="text-xs text-gray-300">Deliver to</span>
          <span className="ml-1 font-semibold">India</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-grow max-w-2xl border-2 border-gray-300 rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-l-md outline-none"
        />
        <button className="bg-yellow-400 px-4 py-2 rounded-r-md hover:bg-yellow-500 transition text-black">
          Search
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <Link href={"/orders"} className="flex flex-col items-center cursor-pointer hover:underline">
          <PackageCheck className="w-5 h-5" />
          <span>Orders</span>
        </Link>
        <Link href={"/cart"} className="flex flex-col items-center cursor-pointer hover:underline relative">
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
          <button className="bg-yellow-400 text-white rounded-full h-4 w-4 flex justify-center items-center absolute top-0 right-0">{cartItems.length}</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
