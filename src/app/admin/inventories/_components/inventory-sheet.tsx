import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import CreateInventoryForm, { FormValues } from './create-inventory-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InventoryData } from '@/types';
import { createInventory } from '@/http/api';
import { useToast } from '@/components/ui/use-toast';
import { useNewInventory } from '@/store/inventories-store';

const InventorySheet = () => {
  const {toast} = useToast();

  const {isOpen , onClose } = useNewInventory();

  const queryClient = useQueryClient()

  const { mutate , isPending} = useMutation({
    mutationKey: ["create-inventory"],
    mutationFn: (data: InventoryData) => createInventory(data),

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['inventories']})
      toast({
        title: "Inventory created Successfully",
      });
      onClose();
    }
  })

  const onSubmit = (values: FormValues) => {
    console.log('values' , values);
    mutate(values)
  }
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="min-w-[28rem] space-y-4">
          <SheetHeader>
              <SheetTitle>Create Inventory</SheetTitle>
              <SheetDescription>Create a new inventory</SheetDescription>
          </SheetHeader>
          <CreateInventoryForm onSubmit={onSubmit} disabled={isPending}/>
      </SheetContent>
    </Sheet>
  )
}

export default InventorySheet