"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Head from "next/head";
import data from "../mockData.json"; // Your products data
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: number;
  deliveryDate: number; // days to add for delivery
  sku: string;
  availability: "In Stock" | "Out of Stock";
  categories: string[];
  tags: string[];
}

function formatPrice(num: number) {
  return num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
}

function formatDeliveryDate(daysToAdd: number) {
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + daysToAdd);

  if (daysToAdd === 1) return "Tomorrow";

  return deliveryDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Page() {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const productId = parseInt(String(params?.id ?? "")); // id is string
  const product = data.find((item) => item.id === productId);
  console.log(product)
  function onQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Math.max(1, Math.min(99, Number(e.target.value)));
    setQuantity(val);
  }

  if (!product) {
    return (
      <main className="max-w-6xl mx-auto p-8 bg-white rounded-md shadow-md mt-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-4">
          The product you are looking for does not exist. Please check the URL or go back to{" "}
          <Link href="/products" className="text-indigo-600 hover:underline">
            Products
          </Link>
          .
        </p>
      </main>
    );
  }


  const {  cartItems, addToCart, removeFromCart, clearCart, updateQuantity} = useCart()

  return (
    <>
      <Head>
        <title>{product.name} - My Store</title>
        <meta name="description" content={product.description} />
      </Head>
      <main className="max-w-6xl mx-auto p-8 bg-white rounded-md  mt-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="list-reset flex space-x-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-700 font-semibold">{product.name}</li>
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Product Image */}
          <div className="md:w-1/2 rounded-lg overflow-hidden flex justify-center items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>

          <section className="md:w-1/2 flex flex-col">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{product.name}</h1>


            <div className="mt-5 flex items-center space-x-3">
              {product.discount && product.discount > 0 ? (
                <>
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price * (1 - product.discount / 100))}
                  </span>
                  <span className="text-lg line-through text-gray-400">
                    {formatPrice(product.price)}
                  </span>
                  <span className="bg-red-100 text-red-700 font-semibold px-3 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              )}
            </div>

            <p className="mt-4 text-gray-700">{product.description}</p>

            <ul className="mt-6 text-sm text-gray-600 space-y-2">
              <li>
                <strong>Availability:</strong>{" "}
                <span
                  className={product.availability === "In Stock" ? "text-green-600" : "text-red-600"}
                >
                  {product.availability}
                </span>
              </li>
              
              <li>
                <strong>Tags:</strong>{" "}
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mr-1"
                  >
                    {tag}
                  </span>
                ))}
              </li>
              <li>
                <strong>Estimated Delivery:</strong>{" "}
                <span className="font-semibold">{formatDeliveryDate(product.deliveryDate)}</span>
              </li>
            </ul>

            {/* Quantity selector & actions */}
            <div className="mt-8 flex items-center space-x-5">
              <label htmlFor="quantity" className="font-semibold text-gray-700">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min={1}
                max={99}
                value={quantity}
                onChange={onQuantityChange}
                className="w-16 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Select quantity"
              />
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                type="button"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Add to cart"
                onClick={() => addToCart(product,quantity)}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Add to wishlist"
                onClick={() => alert(`Added ${product.name} to wishlist`)}
              >
                Add to Wishlist
              </button>
            </div>
          </section>
          
        </div>
       <section className="mt-10" aria-labelledby="reviews-heading">
  <h2 id="reviews-heading" className="text-2xl font-bold text-gray-900 mb-4">
    Customer Reviews
  </h2>

  {product.reviews && product.reviews.length > 0 ? (
    <div className="space-y-6">
      {product.reviews.map((review, index) => {
        const maxStars = 5;
        const filledStars = review.rating;
        const emptyStars = maxStars - filledStars;

        return (
          <div key={index} className="border-b border-gray-200 pb-4">
            {review.reviewer && (
              <p className="text-sm font-semibold text-gray-800">{review.reviewer}</p>
            )}
            {review.date && (
              <p className="text-xs text-gray-500 mb-1">
                {new Date(review.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}
            <p className="text-sm text-gray-600">{review.comment}</p>

            <div className="flex items-center mt-2" aria-label={`${review.rating} out of 5 stars`}>
              {[...Array(filledStars)].map((_, i) => (
                <svg
                  key={`star-filled-${i}`}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.784.57-1.838-.196-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
                </svg>
              ))}
              {[...Array(emptyStars)].map((_, i) => (
                <svg
                  key={`star-empty-${i}`}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.784.57-1.838-.196-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
                </svg>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="text-gray-500 text-center">No customer reviews yet.</p>
  )}
</section>

      </main>
    </>
  );
}

export default Page;
