"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import React, { createContext, useContext, ReactNode } from "react";
import { Product } from "@/types";

interface CartStore {
  items: Product[];
  addToCart: (item: Product) => void;
  removeToCart: (id: number) => void;
  removeAll: () => void;
}

const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addToCart: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          console.log("Item already exists");
        } else {
          set({ items: [...currentItems, item] });
          alert("Item added to Cart");
        }
      },
      removeToCart: (id) => {
        set({ items: get().items.filter((ele) => ele.id !== id) });
        alert("Item removed");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const CartContext = createContext<CartStore | undefined>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const cartStore = useCartStore();

  return (
    <CartContext.Provider value={cartStore}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
