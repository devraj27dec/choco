"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProducts } from "@/http/api";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Products = () => {
  const skeltons = Array.from({ length: 4 });
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  
  return (
    <section id="product" className=" bg-[#f5f5f5] px-14 md:py-20">
      <div className=" mx-auto max-w-6xl">
        <div className=" flex items-center justify-center gap-5">
          <h2 className=" text-3xl font-bold tracking-tight text-brown-900">
            Products
          </h2>
        </div>
        <div className=" mt-20 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {products && products.length > 0 && (
            isLoading ? (
              <>
                {skeltons.map((_, i) => (
                  <div key={i} className="flex h-full w-full flex-col gap-5">
                    <Skeleton className="aspect-square w-full rounded-md bg-brown-100" />
                    <Skeleton className="h-5 w-full rounded-md bg-brown-100" />
                    <Skeleton className="h-5 w-10 rounded-md bg-brown-100" />
                    <Skeleton className="h-8 w-full rounded-md bg-brown-100" />
                  </div>
                ))}
              </>
            ) : (
              <>
                {products.map((product: Product) => (
                  <div key={product.id}>
                    <Image
                      src={`/assets/${product.image}`}
                      alt={product.name}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%" }}
                      className="aspect-square rounded-t-md object-cover shadow-lg hover:cursor-pointer"
                    />

                    <div className="w-full">
                      <p className="text-lg font-semibold text-brown-900">
                        {product.name}
                      </p>

                      <div className="mt-1 space-x-2">
                        <span className="font-bold">{product.price}</span>
                      </div>

                      <Link href={`/product/${product.id}`}>
                        <Button
                          size="sm"
                          className="mt-5 w-full bg-brown-900 hover:bg-brown-800 active:bg-brown-700"
                        >
                          Buy Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            )
          )}
        </div>
        {products && products.length === 0 && !isLoading && (
          <div className="flex justify-center items-center mt-20">
            <p className="text-xl font-semibold text-gray-600 text-center">
              Currently Products are not Available!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
