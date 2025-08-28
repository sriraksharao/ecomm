import { useState } from "react";

const Sidebar = ({ filters, setFilters }) => {
  const brands = ["Canon", "Nikon"];
  const ratings = [5, 4, 3];
  const discounts = [10, 20, 30, 40];
  const deliveryDaysOptions = [1, 2, 4, 6]; // new delivery days options

  const safeNumberValue = (val) => (val !== null && val !== undefined ? val : "");

  const handleCheckboxArrayChange = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      const newValues = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [key]: newValues };
    });
  };

  const handleBooleanChange = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const clearFilters = () => {
    setFilters({
      brand: [],
      rating: [],
      bestSeller: false,
      discount: null,
      deliveryDays: null,
    });
  };

  return (
    <div className="w-72 bg-white p-4 shadow rounded-lg space-y-6 text-sm sticky top-14">
      {/* Brand Filter */}
      <div>
        <h3 className="text-base font-semibold mb-2">Brand</h3>
        {brands.map((brand) => (
          <label key={brand} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={filters.brand?.includes(brand)}
              onChange={() => handleCheckboxArrayChange("brand", brand)}
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-base font-semibold mb-2">Customer Rating</h3>
        {ratings.map((r) => (
          <label key={r} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={filters.rating?.includes(r)}
              onChange={() => handleCheckboxArrayChange("rating", r)}
            />
            <span>{r} Stars & Up</span>
          </label>
        ))}
      </div>

      {/* Best Seller Filter */}
      <div>
        <h3 className="text-base font-semibold mb-2">Best Seller</h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filters.bestSeller || false}
            onChange={() => handleBooleanChange("bestSeller")}
          />
          <span>Only Best Sellers</span>
        </label>
      </div>

      {/* Discount Filter */}
      <div>
        <h3 className="text-base font-semibold mb-2">Min Discount (%)</h3>
        <select
          className="w-full border rounded px-2 py-1"
          value={safeNumberValue(filters.discount)}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              discount: e.target.value === "" ? null : Number(e.target.value),
            }))
          }
        >
          <option value="">All Discounts</option>
          {discounts.map((d) => (
            <option key={d} value={d}>
              {d}%
            </option>
          ))}
        </select>
      </div>

      {/* Delivery Days Filter - changed to select dropdown */}
      <div>
        <h3 className="text-base font-semibold mb-2">Max Delivery Days</h3>
        <select
          className="w-full border rounded px-2 py-1"
          value={safeNumberValue(filters.deliveryDays)}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              deliveryDays: e.target.value === "" ? null : Number(e.target.value),
            }))
          }
        >
          <option value="">Any</option>
          {deliveryDaysOptions.map((day) => (
            <option key={day} value={day}>
              {day} day{day > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      <button
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Sidebar;
