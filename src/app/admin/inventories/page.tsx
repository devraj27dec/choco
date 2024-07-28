"use client";
import React from "react";
import InventorySheet from "./_components/inventory-sheet";
import { Button } from "@/components/ui/button";
import { DataTable } from "../_component/data-table";
import { columns } from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import { Inventory } from "@/types";
import { getAllInventories } from "@/http/api";
import { useNewInventory } from "@/store/inventories-store";
import { Loader2 } from "lucide-react";

const InventoryPage = () => {
  const { onOpen } = useNewInventory();

  const {
    data: inventories,
    isLoading,
    isError,
  } = useQuery<Inventory[]>({
    queryKey: ["inventories"],
    queryFn: getAllInventories,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Inventories</h3>
        <Button size={"sm"} onClick={onOpen}>
          Add Inventory
        </Button>
        <InventorySheet />
      </div>

      {isError && <span className="text-red-500">Something went wrong.</span>}

      {isLoading ? (
        <div className=" flex items-center justify-center">
          <Loader2 className=" size-12 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={inventories || []} />
      )}
    </>
  );
};

export default InventoryPage;
