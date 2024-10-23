import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CreateDelieveryPersonForm, {
  FormValues,
} from "./create-delivery-person-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeliveryPerson } from "@/http/api";
import { DeliveryPerson } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useNewDeliveryPerson } from "@/store/delivery-persons-store";

const DelieveryPersonsSheet = () => {
  const { isOpen, onClose } = useNewDeliveryPerson();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-delivery-person"],
    mutationFn: (data: DeliveryPerson) => createDeliveryPerson(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["delivery-persons"],
      });
      toast({
        title: "Delivery Person Created Successfully",
      });
    },
  });
  
  const onSubmit = (values: FormValues) => {
    mutate(values as DeliveryPerson);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Create Delivery Person</SheetTitle>
          <SheetDescription>Create a new delivery person</SheetDescription>
        </SheetHeader>
        <CreateDelieveryPersonForm onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default DelieveryPersonsSheet;
