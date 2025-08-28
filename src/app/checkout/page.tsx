"use client";

import { useCart } from "@/context/CartContext";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const { cartItems } = useCart();
  const navigate = useRouter();
  const getTotal = () =>
    cartItems.reduce((acc:any, item:any) => acc + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
  });

  const validate = () => {
    const newErrors: any = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.zip || form.zip.length < 5)
      newErrors.zip = "ZIP must be at least 5 digits";
    if (
      !form.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    )
      newErrors.email = "Invalid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCheckout = () => {
    if (!validate()) return;
   const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
const newOrder = { ...form, cartItems, createdAt: new Date().toISOString() };
console.log(newOrder);
existingOrders.push(newOrder);
localStorage.setItem("orders", JSON.stringify(existingOrders));
    navigate.push("/orders");
  };

  return (
    <main className="max-w-7xl mx-auto p-6 md:flex md:gap-8">
      {/* Shipping Info Form */}
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <div className="bg-white border rounded-md p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold mb-2 text-yellow-700">Shipping Details</h2>
          {["name", "address", "city", "state", "zip", "email"].map((field) => (
            <div key={field}>
              <input
                type="text"
                name={field}
                value={(form as any)[field]}
                onChange={handleChange}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                className="w-full p-3 border rounded-md focus:outline-yellow-500"
              />
              {errors[field as keyof typeof errors] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field as keyof typeof errors]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <aside className="w-full md:w-[350px] mt-10 md:mt-0 sticky top-6 self-start">
        <div className="bg-white border rounded-md p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            {cartItems.map((item: any) => (
              <div key={item.id} className="flex items-start gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded border"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <hr className="my-4" />
          <div className="flex justify-between text-base font-semibold">
            <span>Subtotal:</span>
            <span>₹{getTotal().toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-md font-semibold transition"
          >
            🛒 Place your order
          </button>
        </div>
      </aside>
    </main>
  );
}
