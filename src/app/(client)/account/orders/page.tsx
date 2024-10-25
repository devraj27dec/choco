'use client'
import React from 'react'
import Header from '../../_component/Header'
import { useQuery } from '@tanstack/react-query'
import { MyOrder } from '@/types'
import { getAllOrders } from '@/http/api'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { CircleCheck, Loader2 } from 'lucide-react'
import { capitalizeFirstLetter } from '@/lib/utils'

const MyOrdersPage = () => {
  const {data: MyOrders , isLoading , isError} = useQuery<MyOrder[]> ({
    queryKey: ['my-orders'],
    queryFn: getAllOrders,
  })

  console.log(MyOrders)
  return (
    <div>
        <Header/>
        <section className=' relative border-t'>
          <div className=' mx-auto h-full max-w-5xl px-5 py-14'>
              <h1 className=' mb-2 text-3xl font-bold'>Order History</h1>
              <p className=' mb-5'>Check the status of recent orders.</p>
          </div>
          <div className='space-y-5'>
            {isLoading && <Loader2 className="size-10 animate-spin"/>}
            {isError && <span>Something went wrong</span>}
            {MyOrders?.map((item) => (
              <Card key={item.id}>
                <div className=' flex gap-3'>
                  <div className=' flex flex-col p-5 text-sm'>
                    <span>Order Placed</span>
                    <span>{item.createdAt}</span>
                  </div>
                  <div className=' flex flex-col p-5 text-sm' >
                    <span>Total Ammount</span>
                    <span>${item.price}</span>
                  </div>
                </div>
                <Separator/>
                <div className=' flex gap-x-10 p-5'>
                  <Image 
                    src={`/assets/${item.image}`}
                    alt='img'
                    width={120}
                    height={120}
                    className='aspect-square rounded-md object-cover'
                  />
                  <div className=' flex-1 space-y-2'>
                    <div className='flex justify-between'>
                      <h3>{item.product}</h3>
                      <span>${item.price}</span>
                    </div>
                    <p>{item.productDescription}</p>
                    <div className=' flex justify-end'>
                      <div className=' flex gap-2'>
                        <CircleCheck 
                          className='size-5 text-white'
                          
                        />
                        <span className=' text-sm'>
                          {capitalizeFirstLetter(item.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
    </div>
  )
}

export default MyOrdersPage