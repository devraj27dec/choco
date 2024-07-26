import { productSchema } from "@/lib/validators/productSchema";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export type formValues = z.input<typeof productSchema> 

export const CreateProductForm = ({
  onSubmit
}: {
    onSubmit: (formvalus: formValues) => void
}) => {


  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
    },
  });

  const fileRef = form.register('image');


  const handleSubmit = (values: formValues) => {
    onSubmit(values)
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Chocobar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                        <Input type="file" {...fileRef}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} onChange={(e) =>
                            {const value = parseFloat(e.target.value);
                            field.onChange(value)
                        }} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <Button className=" w-full">
            {/* {disabled ? <Loader2 className=" size-4 animate-spin"/> : 'create'} */}
            Create
        </Button>
      </form>
    </Form>
  );
};
