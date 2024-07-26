'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { DataTable } from './_component/dataTable'
import { columns } from './_component/columns'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '@/http/api'
import { Product } from '@/types'
import ProductSheet from './_component/productSheet'
import { useNewProduct } from '@/store/product-store'

const ProductPage = () => {
  const {onOpen} = useNewProduct();


  const {data: products} = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getAllProducts()
  })

  return (
    <>
      <div className=' flex items-center justify-between'>
      <h3 className=' text-xl font-bold tracking-tight'>Products</h3>
      <Button size={'sm'} onClick={onOpen}>Add Product</Button>
      <ProductSheet/>
      </div>
      {/* {isError && <span className=' text-red-500'>Something went wrong.</span>} */}
    <DataTable columns={columns} data={products || []} />
    </>
  )
}

export default ProductPage