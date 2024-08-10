import * as v from 'valibot';

export const DraftProductSchema = v.object({
    name: v.string(),
    price: v.number()
})

export const ProductResponseSchema = v.object({
    id: v.number(),
    name: v.string(),
    price: v.number(),
    availability: v.boolean(),
})

export const ProductsResponseSchema = v.array(ProductResponseSchema)

