"use client";
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const getTotal = () =>
    cartItems.reduce((acc:any, item:any) => acc + item.price * item.quantity, 0);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
         <div className="md:col-span-2 space-y-6">
  {cartItems.map((item: any) => (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row gap-4 border p-4 rounded-xl shadow-sm"
    >
      {/* Product Image */}
      <div className="flex-shrink-0 justify-center items-center">
        <Image
          src={item.image}
          alt={item.name}
          width={144}
          height={144}
          className="object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-gray-500 mb-2">₹{item.price.toFixed(2)}</p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm">Qty:</span>
            <button
              onClick={() =>
                updateQuantity(item.id, Math.max(item.quantity - 1, 1))
              }
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg"
            >
              −
            </button>
            <span className="w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg"
            >
              +
            </button>
          </div>

          {/* Total per Item */}
          <p className="text-sm text-gray-600">
            Total: ₹{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        {/* Remove Button */}
        <div className="mt-2">
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


          {/* Order Summary */}
          <div className="border p-6 rounded-lg shadow-sm h-fit sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="flex justify-between text-lg">
              <span>Subtotal</span>
              <span>₹{getTotal().toFixed(2)}</span>
            </p>
            <Link href="/checkout"
              className="mt-6 p-2 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded transition cursor-pointer"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
