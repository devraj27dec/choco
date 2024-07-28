import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import CreateInventoryForm from './create-inventory-form';

const InventorySheet = () => {

  
  return (
    <Sheet open={true}>
        <SheetContent className="min-w-[28rem] space-y-4">
          <SheetHeader>
              <SheetTitle>Create Inventory</SheetTitle>
              <SheetDescription>Create a new inventory</SheetDescription>
          </SheetHeader>
          <CreateInventoryForm />
      </SheetContent>
    </Sheet>
  )
}

export default InventorySheet