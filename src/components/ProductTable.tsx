import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { formatCurrency } from "../helpers"
import { ProductsResponse } from "../types"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/outline"
import Swal from "sweetalert2"
import { deleteProduct, updateAvailability } from "../services/ProductService"

type ProductTableProps = {
    products: ProductsResponse
}

export async function action({ params }: ActionFunctionArgs) {
    const r = await Swal.fire({
        title: "Estas seguro de eliminar este cliente?",
        text: "No podras revertir esto despues!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar!'
    })

    if (r.isConfirmed) {
        if (params.id) {
            await deleteProduct(+params.id)
        }
    }
    return redirect('/')
}

export async function actionUpdate({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    await updateAvailability(+data.id)
    
    return null
}

const ProductTable = ({ products }: ProductTableProps) => {

    const fetcher = useFetcher();
    const navigate = useNavigate();

    return (

        <div className="p-2">
            <table className="w-full mt-5 table-auto">
                <thead className="bg-slate-800 text-white">
                    <tr>
                        <th className="p-2">Producto</th>
                        <th className="p-2">Precio</th>
                        <th className="p-2">Disponibilidad</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => (
                            <tr className="border-b " key={product.id}>
                                <td className="p-3 text-lg text-gray-800">
                                    {product.name}
                                </td>
                                <td className="p-3 text-lg text-gray-800">
                                    {formatCurrency(product.price)}
                                </td>
                                <td className="p-3 text-lg text-gray-800">
                                    <fetcher.Form
                                        method="POST"
                                    >
                                        <button
                                            type="submit"
                                            className={`${product.availability ? 'text-slate-800' : 'text-red-600'} mx-auto p-2 rounded border text-xs font-bold w-full`}
                                            name="id"
                                            value={product.id}
                                        >
                                            {product.availability ? 'Disponible' : 'No Disponible'}
                                        </button>
                                    </fetcher.Form>
                                </td>
                                <td className="p-3 text-lg text-gray-800 ">
                                    <div className="flex gap-2 items-center">
                                        <button
                                            onClick={() => navigate(`/edit-product/${product.id}`)}
                                            className="bg-yellow-500 w-full rounded-lg p-2  text-white flex justify-center items-center gap-2"
                                        >
                                            <PencilSquareIcon className="h-6" />
                                            <span className="text-xs font-bold uppercase">Editar</span>
                                        </button>
                                        <Form
                                            method="POST"
                                            action={`/delete-product/${product.id}`}
                                            className="bg-red-500 w-full rounded-lg p-2  text-white flex justify-center items-center gap-2"

                                        >
                                            <TrashIcon className="w-6" />
                                            <input
                                                className="text-xs font-bold uppercase"
                                                type="submit"
                                                value={'Eliminar'}
                                            />
                                        </Form>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}

export default ProductTable