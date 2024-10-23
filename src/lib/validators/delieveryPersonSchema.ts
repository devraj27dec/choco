import {z} from 'zod'

export const deliveryPersonSchema = z.object({
    name: z.string({message: 'Delievery person name should be a string'}),
    phone: z.string({message: 'Phone should be a string'}).length(13 , 'Delievery person phone should be 13 char long'),
    warehouseId: z.string({message: "warehouseId should be a string"})
})