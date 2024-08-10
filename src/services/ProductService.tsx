import { safeParse } from "valibot";
import { ProductData, ProductResponse } from "../types";
import { DraftProductSchema, ProductResponseSchema, ProductsResponseSchema } from "../schemas/product-schema";
import clientAxios from "../config/clientAxios";
import { toBoolean } from "../helpers";

export async function addProduct(product: ProductData): Promise<void> {
    try {
        const result = safeParse(DraftProductSchema, {
            name: product.name,
            price: +product.price
        });

        if (result.success) {
            await clientAxios.post<ProductResponse>('/products', {
                name: result.output.name,
                price: result.output.price
            })

        } else {
            throw new Error('Datos no válidos')
        }

    } catch (error) {
        console.log(error);
    }
}

export async function getProducts(): Promise<ProductResponse[]> {
    try {
        const response = await clientAxios.get<ProductResponse[]>('/products');

        const result = safeParse(ProductsResponseSchema, response.data);

        if (result.success) {
            return result.output
        } else {
            return []
        }

    } catch (error) {
        console.log(error);
        return []
    }

}
export async function getProductById(id: ProductResponse['id']) {
    try {
        const response = await clientAxios.get<ProductResponse>(`/products/${id}`);

        const result = safeParse(ProductResponseSchema, response.data);

        if (result.success) {
            return result.output
        } else {
            throw new Error('Datos no válidos')
        }

    } catch (error) {
        console.log(error);
    }

}

export async function updateProduct(product: ProductData, id: ProductResponse['id']): Promise<void> {
    try {

        const result = safeParse(ProductResponseSchema, {
            id,
            name: product.name,
            price: +product.price,
            availability: toBoolean(product.availability.toString())
        });

        if (result.success) {
            await clientAxios.put<ProductResponse>(`/products/${id}`, result.output)
        } else {
            throw new Error('Datos no válidos')
        }

    } catch (error) {
        console.log(error);
    }
}

export async function deleteProduct(id: ProductResponse['id']) {
    try {
        await clientAxios.delete(`/products/${id}`);
    } catch (error) {
        console.log(error);
    }
}
export async function updateAvailability(id: ProductResponse['id']) {
    try {
        await clientAxios.patch(`/products/${id}`);
    } catch (error) {
        console.log(error);
    }
}