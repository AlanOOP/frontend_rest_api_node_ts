import { ActionFunctionArgs, Form, useActionData, redirect } from "react-router-dom"
import ErrorMessage from "./ErrorMessage";
import { addProduct } from "../services/ProductService";

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = '';

    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
        return error;
    }

    await addProduct(data);

    return redirect('/')
}

const FormComponent = () => {

    const error = useActionData() as string;


    return (
        <Form
            className="mt-10"
            method='POST'

        >

            {
                error && <ErrorMessage>{error}</ErrorMessage>
            }

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
                />
            </div>
            <input
                type="submit"
                className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                value="Registrar Producto"
            />
        </Form>
    )
}

export default FormComponent