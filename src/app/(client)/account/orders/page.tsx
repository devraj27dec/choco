'use client'
import React from 'react'
import Header from '../../_component/Header'
import { useQuery } from '@tanstack/react-query'
import { MyOrder } from '@/types'
import { getMyOrders } from '@/http/api'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

const MyOrdersPage = () => {
  const {data: myOrders} = useQuery<MyOrder[]> ({
    queryKey: ['my-orders'],
    queryFn: getMyOrders,
  })
  return (
    <div>
        <Header/>
        <section>
            <div>
                <h1>Order history</h1>
                <p>Check the status of recent orders.</p>
                {myOrders?.map((item) => (
                    <Card key={item.id}>
                        <div className=' flex gap-x-5'>
                            <div className=' flex flex-col p-5 text-sm'>
                                <span>Date placed</span>
                                <span>{FormData(item.createdAt)}</span>
                            </div>
                            <div className=' flex flex-col p-5 text-sm'>
                                <span>Total amount</span>
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
                             className=' rounded-md object-cover '
                            />

                            <div className=' flex-1'>
                                
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