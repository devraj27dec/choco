import {z} from 'zod'

export const orderSchema = z.object({
    productId: z.string({message: "Product Id should be a string"}),
    pincode: z.string({message: "pincode should be a string"}).length(6 , 'Pincode should be 6 char long'),
    qty: z.number({message: "Qty should be a number"}),
    address: z.string({message: 'Address should be a string'})
    .min(5 , {message: 'Address should be at least 5 char long'}),
})