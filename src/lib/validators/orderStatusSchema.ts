import z from 'zod'

export const orderStatusSchema = z.object({
    orderId: z.string({message: "Order Id should be a string"}),
    status: z.string({message: 'status should be a string'})
})