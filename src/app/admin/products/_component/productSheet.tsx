import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  } from "@/components/ui/sheet"
import { CreateProductForm , formValues} from './create-product-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '@/http/api';
import { useNewProduct } from '@/store/product-store';
import { useToast } from "@/components/ui/use-toast"


const ProductSheet = () => {
  const {toast} = useToast()

  const { isOpen , onClose} = useNewProduct()

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationKey: ['create-product'],
    mutationFn: (data: FormData) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product created successfully',
      });
      onClose();

    }
  })

  const onSubmit = (values: formValues) => {
    console.log("values" , values);

    const formData = new FormData()

    formData.append('name' , values.name);
    formData.append('descriptions' , values.description);
    formData.append('price' , String(values.price));
    formData.append('image', (values.image as FileList)[0]);
    
    mutate(formData);
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className=' min-w-[28rem] space-y-4'>
          <SheetHeader>
            <SheetTitle>Create Product</SheetTitle>
            <SheetDescription>Create a new product</SheetDescription>
          </SheetHeader>
          <CreateProductForm onSubmit={onSubmit}/>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ProductSheet