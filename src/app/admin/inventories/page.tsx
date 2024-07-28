'use client'
import React from 'react'
import InventorySheet from './_components/inventory-sheet'
import { Button } from '@/components/ui/button'
import { DataTable } from '../_component/data-table'
import { columns } from './_components/columns'
import { useQuery } from '@tanstack/react-query'
import { Inventory } from '@/types'
import { getAllInventories } from '@/http/api'

const InventoryPage = () => {


  const {data: inventories} = useQuery<Inventory[]>({
    queryKey: ['inventories'],
    queryFn: getAllInventories,
  })


  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Inventories</h3>
        <Button size={'sm'}>
          Add Inventory
        </Button>
        <InventorySheet />
      </div>

        <DataTable columns={columns} data={inventories || []} />
    
    </>
  )
}

export default InventoryPage