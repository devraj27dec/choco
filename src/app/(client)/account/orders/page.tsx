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
  const {data: MyOrders , isLoading} = useQuery<MyOrder[]> ({
    queryKey: ['my-orders'],
    queryFn: getMyOrders,
  })
  return (
    <div>
        <Header/>
        <section className=' relative border-t'>
            <div className=' mx-auto h-full max-w-5xl px-5 py-14'>
                <h1 className=' mb-5 text-3xl'>Order History</h1>
                <p className=' mb-5'>Check the status of recent orders.</p>
            </div>

        </section>
    </div>
  )
}

export default MyOrdersPage