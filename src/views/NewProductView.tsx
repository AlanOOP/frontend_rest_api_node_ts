import { Link } from "react-router-dom"
import FormComponent from "../components/FormComponent"

const NewProductView = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black text-slate-500">Nuevo Producto</h2>
                <Link
                    to={'/'}
                    className="rounded bg-indigo-600 p-3 text-sm shadow-sm font-bold text-white hover:bg-indigo-500 transition-all ease-in-out duration-300"
                >
                    Volver a Productos
                </Link>
            </div>
            <FormComponent />
        </>
    )
}

export default NewProductView