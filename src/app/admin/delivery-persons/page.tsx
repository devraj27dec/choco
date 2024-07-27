'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { DataTable } from '../_component/data-table'
import { columns } from './_components/columns'
import { deliveryPersons } from '@/lib/db/schema'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/types'
import DelieveryPersonsSheet from './_components/delivery-person-sheet'

const DelieveryPersonsPage = () => {


  const { data: deliveryPersons} = useQuery<Product[]>({
    queryKey: ['delivery']
  })
  return (
    <>
        <div className=' flex items-center justify-between'>
        <h3 className="text-2xl font-bold tracking-tight">Delivery Persons</h3>
            <Button size={'sm'}>
              Add Delivery Person
            </Button>
          <DelieveryPersonsSheet/>
        </div>

        <DataTable columns={columns} data={deliveryPersons || []}/>
    </>
  )
}

export default DelieveryPersonsPage