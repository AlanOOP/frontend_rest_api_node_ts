import * as v from 'valibot';
import { DraftProductSchema, ProductResponseSchema, ProductsResponseSchema } from '../schemas/product-schema';

export type ProductData = {
    [k: string]: FormDataEntryValue;
}

export type DraftProduct = v.InferOutput<typeof DraftProductSchema>

export type ProductResponse = v.InferOutput<typeof ProductResponseSchema>
export type ProductsResponse = v.InferOutput<typeof ProductsResponseSchema>