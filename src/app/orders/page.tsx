"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const allOrders = localStorage.getItem("orders");
    if (allOrders) setOrders(JSON.parse(allOrders));
  }, []);

  if (!orders.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-600">
        <p>No orders found. Please place an order first. <Link className="text-yellow-400" href="/products">Here.</Link> </p>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold mb-6">🧾 Your Orders</h1>

      {orders.map((order, index) => (
        <div key={index} className="border rounded-md shadow bg-white">
          <div className="p-6 border-b bg-yellow-50">
            <h2 className="text-xl font-bold text-yellow-700">
              Order #{index + 1}
            </h2>
            <p className="text-sm text-gray-600">
              Placed on:{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "Unknown date"}
            </p>
          </div>

          {/* Shipping */}
          <div className="p-6 border-b">
            <h3 className="font-semibold mb-2">Shipping Details</h3>
            <p>
              <strong>Name:</strong> {order.name}
            </p>
            <p>
              <strong>Address:</strong> {order.address}, {order.city},{" "}
              {order.state} - {order.zip}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
          </div>

          {/* Items */}
          <div className="p-6">
            <h3 className="font-semibold mb-4">Items</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {order.cartItems.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 border-b pb-4 last:border-b-0"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded border"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ₹{item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                ₹
                {order.cartItems
                  .reduce(
                    (acc: number, item: any) =>
                      acc + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
