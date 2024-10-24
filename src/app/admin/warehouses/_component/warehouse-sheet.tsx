import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  } from "@/components/ui/sheet"
import CreateWarehousesForm, { FormValues } from './create-warehouse-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Warehouse } from '@/types'
import { createWarehouses } from '@/http/api'
import { useNewWarehouse } from '@/store/warehouse-store'
import { useToast } from '@/components/ui/use-toast'


const WarehouseSheet = () => {

  const {toast} = useToast()

  const {isOpen , onClose} = useNewWarehouse()

  const queryClient = useQueryClient();

  const {mutate , isPending} = useMutation({
    mutationKey: ['create-warehouse'],
    mutationFn: (data: Warehouse) => createWarehouses(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouses']});

      toast({
        title: "Warehouse created successfully🚀"
      })
      onClose();
    }
  })

  const onSubmit = (values: FormValues) => {
    mutate(values as Warehouse)
    
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
        <SheetTitle>Create Warehouses</SheetTitle>
        <SheetDescription>
          Create a new warehouse
        </SheetDescription>
        </SheetHeader>
        <CreateWarehousesForm onSubmit={onSubmit} disabled={isPending}/>
      </SheetContent>
    </Sheet>

  )
}

export default WarehouseSheet