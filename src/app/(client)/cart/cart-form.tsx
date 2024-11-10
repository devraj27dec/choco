import { Button } from '@/components/ui/button';
import { getAllProducts } from '@/http/api';
import { useCart } from '@/providers/cart-provider';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Image from 'next/image';

export default function CartForm() {

    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    }); 
    const {items , removeAll , removeToCart} = useCart()

    return (
        <div className="p-4 space-y-4">
            {items.map((product) => (
              <div key={product.id} className="flex items-center space-x-4">
                <Image
                  src={`/assets/${product.image}`}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-600">₹{product.price}</p>
                </div>
                <Button
                  onClick={() => removeToCart(products)}
                  variant="outline"
                  className="text-red-500 border-red-500"
                >
                  Remove
                </Button>
              </div>
            ))}

            <div className="flex justify-between items-center mt-4">
              <p className="font-bold">Total: ₹{items.reduce((total, item) => total + item.price, 0)}</p>
              <Button onClick={removeAll} variant="destructive" className="text-white bg-red-500">
                Clear Cart
              </Button>
            </div>
          </div>
    )
}