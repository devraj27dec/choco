"use client"
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Product } from "@/types";

interface InventorySidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  product?: Product
}

export default function InventorySidebar({ open, setOpen , product}: InventorySidebarProps) {

  return (
    <Sheet open={open} onOpenChange={() => setOpen(false)}>
      <SheetContent className=" min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Inventory</SheetTitle>
          <SheetDescription>This is the list where you can check which warehouse and delivery person is available for this product.</SheetDescription>
        </SheetHeader>


        <div className="space-y-4">
        {product?.availableInventory?.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2"
          >
            <h3 className="font-semibold text-lg">{item.warehouseName}</h3>
            <p className="text-gray-500">Pincode: {item.pincode}</p>
            <p className="text-gray-500">
              Delivery Persons Available: {item.deliveryPersonCount}
            </p>
          </div>
        ))}

        {!product?.availableInventory || product?.availableInventory.length === 0 && (
          <p className="text-gray-500 text-center">No inventory available for this product.</p>
        )}
      </div>
      </SheetContent>
    </Sheet>
  );
}

