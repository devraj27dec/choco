"use client"

import { useCartStore } from "@/store/cart-store"
import { useCart } from "@/providers/cart-provider"
import Image from "next/image"

export default function CartPage() {
  const {isOpen , onClose} = useCartStore();
  const {items , removeAll} = useCart();
  const isEmpty = items.length === 0;

  return (
    <div className=" mx-auto p-10 max-w-4xl min-h-screen">
      <div>
        <h2>Your Cart Items :</h2>
        <span>{items.length}</span>
        
        <div className=" space-y-4">
          {isEmpty ? (
            <div>
              <h1>Nothing in the Shopping Cart</h1>
            </div>
          ) : (
            <>
              {items.map((item) => (
              <div key={item.id} className=" flex items-center space-x-4">
                <Image
                  src={`/assets/${item.image}`}
                  alt={item.name}
                  width={120}
                  height={120}
                  className=" object-cover rounded-sm"
                />
  
                <div className=" ml-5 flex justify-between w-full font-medium">
                  <p>{item.name}</p>
                  <div className=" flex items-center gap-x-2">
                    <p>${item.price}</p>
                  </div>

                  <p></p>
                </div>
              </div>
            ))}
            </>
          )}
        </div>
      </div>
    </div>

  )
}