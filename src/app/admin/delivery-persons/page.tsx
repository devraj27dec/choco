"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { DataTable } from "../_component/data-table";
import { columns } from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import DelieveryPersonsSheet from "./_components/delivery-person-sheet";
import { getAllDeliveryPersons } from "@/http/api";
import { useNewDeliveryPerson } from "@/store/delivery-persons-store";
import { Loader2 } from "lucide-react";

const DelieveryPersonsPage = () => {
  const { onOpen } = useNewDeliveryPerson();

  const {
    data: deliveryPersons,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["delivery-persons"],
    queryFn: getAllDeliveryPersons,
  });
  return (
    <>
      <div className=" flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Delivery Persons</h3>
        <Button size={"sm"} onClick={onOpen}>
          Add Delivery Person
        </Button>
        <DelieveryPersonsSheet />
      </div>

      {isError && <span className="text-red-500">Something went wrong.</span>}

      {isLoading ? (
        <div className=" flex items-center justify-center">
          <Loader2 className=" size-12 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={deliveryPersons || []} />
      )}
    </>
  );
};

export default DelieveryPersonsPage;
