"use client";
import React, { createContext, useContext, useState } from "react";

// Create the context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        // If already in cart, increase quantity
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
