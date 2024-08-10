import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import { ProductsResponse } from "../types";
import ProductTable from "../components/ProductTable";

export async function loader() {
  const products: ProductsResponse = await getProducts()
  return products
}

const ProductsView = () => {

  const products : ProductsResponse = useLoaderData() as ProductsResponse;

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to={'/new-product'}
          className="rounded bg-indigo-600 p-3 text-sm shadow-sm font-bold text-white hover:bg-indigo-500 transition-all ease-in-out duration-300"
        >
          Agregar Contenido
        </Link>
      </div>
      <ProductTable products={products} />
    </>
  )
}

export default ProductsView;