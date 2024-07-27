import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import CreateDelieveryPersonForm from './create-delivery-person-form'

  
const DelieveryPersonsSheet = () => {
  
  
  return (
    <Sheet open={true}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
        <SheetTitle>Create Delivery Person</SheetTitle>
        <SheetDescription>Create a new delivery person</SheetDescription>
        </SheetHeader>
          <CreateDelieveryPersonForm />
        </SheetContent>
    </Sheet>

  )
}

export default DelieveryPersonsSheet