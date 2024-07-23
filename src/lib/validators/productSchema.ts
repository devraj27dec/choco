import {z} from 'zod'

export const productSchema = z.object({
    name:z.string({message: "product name shoud be a string"}).min(4),
    image: z.instanceof(File , {message: "Product image should be a image"}),
    description: z.string({message: "Product description should be as a string "}),
    price: z.number({message: "Product price should be a Number"})
})