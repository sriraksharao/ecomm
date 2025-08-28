"use client";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }: { product: any }) {
  const maxStars = 5;
  const filledStars = product.rating;
  const emptyStars = maxStars - filledStars;

  function formatDeliveryDate(daysToAdd: number) {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + daysToAdd);

    const diffTime = deliveryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Tomorrow";
    }

    return deliveryDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatPrice(num: number) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  }

  return (
    <Link href={`/products/${product.id}`} className="flex relative bg-white border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 w-full space-x-6 items-center m-2">
      {/* Image */}
      <div className="relative rounded-lg overflow-hidden w-56">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="object-contain"
          priority={true}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 max-w-[75%]">
            {product.name}
          </h3>
          {/* Best Seller badge */}
          {product.bestSeller && (
            <span className="text-xs absolute top-0 left-0 font-bold bg-yellow-400 px-4 py-2 text-white px-2 py-0.5 ">
              Best Seller
            </span>
          )}
        </div>

        

        {/* Price & Discount */}
        <div className="mb-3 flex items-baseline space-x-3">
          {product.discount > 0 ? (
            <>
              <span className="text-2xl font-extrabold text-gray-900">
                ${formatPrice(product.price * (1 - product.discount / 100))}
              </span>
              <span className="text-base text-gray-500 line-through">
                ${formatPrice(product.price)}
              </span>
              <span className="text-sm font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            </>
          ) : (
            <span className="text-2xl font-extrabold text-gray-900">
              ${formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Delivery Info */}
        <p className="text-sm text-gray-700 mb-4 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h2l3 7 4-10 3 7 3-6 2 3"
            />
          </svg>
          <span>
            Delivery by{" "}
            <span className="font-semibold">
              {formatDeliveryDate(product.deliveryDate)}
            </span>
          </span>
        </p>

        {/* Description */}
        <p className="text-gray-800 text-sm line-clamp-3 mb-6">{product.description}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
