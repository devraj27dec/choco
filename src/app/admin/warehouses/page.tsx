/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import WarehouseSheet from './_component/warehouse-sheet'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/types'
import { getAllWarehouses } from '@/http/api'
import { DataTable } from '../products/_component/dataTable'
import { columns } from './_component/columns'
import { useNewWarehouse } from '@/store/warehouse-store'

const warehousesPage = () => {

  const {onOpen} = useNewWarehouse()


  const { data: warehouses} = useQuery<Product[]>({
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

        <DataTable columns={columns} data={warehouses || []}/>
    </>
  )
}

export default warehousesPage