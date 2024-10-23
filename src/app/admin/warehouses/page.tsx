/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import WarehouseSheet from './_component/warehouse-sheet'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/types'
import { getAllWarehouses } from '@/http/api'
import { DataTable } from '../_component/data-table'
import { columns } from './_component/columns'
import { useNewWarehouse } from '@/store/warehouse-store'
import { Loader2 } from 'lucide-react'

const warehousesPage = () => {
  const {onOpen} = useNewWarehouse()

  const { data: warehouses , isLoading , isError} = useQuery<Product[]>({
    queryKey:['warehouses'],
    queryFn: getAllWarehouses
  })

  return (
    <>
        <div className=' flex items-center justify-between'>
          <h3 className="text-2xl font-bold tracking-tight">Warehouses</h3>
          <Button size={'sm'} onClick={onOpen}>Add Warehouses</Button>
          <WarehouseSheet/>
        </div>

        {isError && <span className="text-red-500">Something went wrong.</span>}

        {isLoading ? (
          <div className=' flex items-center justify-center'>
            <Loader2 className='size-12 animate-spin' />
          </div>
        ): (
          <DataTable columns={columns} data={warehouses || []}/>
        )}

    </>
  )
}

export default warehousesPage