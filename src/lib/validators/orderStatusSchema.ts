import z from 'zod'

export const orderStatusSchema = z.object({
    orderId: z.number({message: "Order Id should be a number"}),
    status: z.string({message: 'status should be a string'})
})