import { ReactNode } from "react"


const ErrorMessage = ({ children }: { children: ReactNode }) => {
    return (
        <div className="p-3 bg-red-200 text-red-500 border-l-4 border-red-500 font-semibold my-5">
            {children}
        </div>
    )
}

export default ErrorMessage