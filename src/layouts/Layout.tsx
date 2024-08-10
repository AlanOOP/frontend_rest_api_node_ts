import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const Layout = () => {
    return (
        <>
            <Header />
            <main className="mt-10 mx-auto max-w-6xl bg-white shadow p-10">
                <Outlet />
            </main>
        </>
    )
}

export default Layout