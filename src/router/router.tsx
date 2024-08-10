import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import ProductsView from "../views/ProductsView";
import NewProductView from "../views/NewProductView";
import { action as newProductAction } from "../components/FormComponent";
import { loader as productLoader } from "../views/ProductsView";
import EditProductView, { loader as editProductLoader, action as editProductAction } from "../views/EditProductView";
import { action, actionUpdate } from "../components/ProductTable";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <ProductsView />,
                loader: productLoader,
                action: actionUpdate
            },
            {
                path: 'new-product',
                element: <NewProductView />,
                action: newProductAction
            },
            {
                path: 'edit-product/:id',
                element: <EditProductView />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path:'delete-product/:id',
                action: action
            }
        ]
    }
])