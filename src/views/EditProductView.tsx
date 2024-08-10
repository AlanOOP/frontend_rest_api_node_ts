import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom"
import { getProductById, updateProduct } from "../services/ProductService"
import { ProductResponse } from "../types"

const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]

export async function loader({ params }: LoaderFunctionArgs) {

    if (params.id) {
        const product = await getProductById(+params.id)
        console.log(product);

        if (!product) {
            return redirect('/')
        }

        return product
    }

    return {}
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = '';

    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
        return error;
    }

    if (params.id) {
        await updateProduct(data, +params.id)
    }
    return redirect('/')

}

const EditProductView = () => {

    const product = useLoaderData() as ProductResponse;
    return (
        <>
            <div className="flex justify-between items-center flex-col sm:flex-row gap-2">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                <Link
                    to={'/'}
                    className="rounded bg-indigo-600 p-3 text-sm shadow-sm font-bold text-white hover:bg-indigo-500 transition-all ease-in-out duration-300"
                >
                    Volver a Productos
                </Link>
            </div>

            <div>
                <Form
                    className="mt-10"
                    method='POST'

                >

                    <div className="mb-4">
                        <label
                            className="text-gray-800"
                            htmlFor="name"
                        >Nombre Producto:</label>
                        <input
                            id="name"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 border"
                            placeholder="Nombre del Producto"
                            name="name"
                            defaultValue={product.name}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-gray-800"
                            htmlFor="price"
                        >Precio:</label>
                        <input
                            id="price"
                            type="number"
                            className="mt-2 block w-full p-3 bg-gray-50 border"
                            placeholder="Precio Producto. ej. 200, 300"
                            name="price"
                            defaultValue={product.price}
                        />

                    </div>
                    <div className="mb-4">
                        <label
                            className="text-gray-800"
                            htmlFor="availability"
                        >Disponibilidad:</label>
                        <select
                            id="availability"
                            className="mt-2 block w-full p-3 bg-gray-50 border"
                            name="availability"
                            defaultValue={product?.availability.toString()}
                        >
                            {availabilityOptions.map(option => (
                                <option key={option.name} value={option.value.toString()}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="submit"
                        className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                        value="Registrar Producto"
                    />
                </Form>
            </div>
        </>
    )
}

export default EditProductView