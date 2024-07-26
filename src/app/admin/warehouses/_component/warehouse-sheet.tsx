import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import CreateWarehousesForm, { FormValues } from './create-warehouse-form'

const WarehouseSheet = () => {

  const onSubmit = (values: FormValues) => {
    console.log(values);
    
  }
  

  return (
    <Sheet open={true}>
        <SheetContent className="min-w-[28rem] space-y-4">
            <SheetHeader>
            <SheetTitle>Create Warehouses</SheetTitle>
            <SheetDescription>
              Create a new warehouse
            </SheetDescription>
            </SheetHeader>
            <CreateWarehousesForm onSubmit={onSubmit}/>
        </SheetContent>
    </Sheet>

  )
}

export default WarehouseSheet