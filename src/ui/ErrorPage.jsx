import {useNavigate, useRouteError } from "react-router-dom"
import Button from "./Button"

function ErrorPage() {
    const errorMessage = useRouteError()
    const navigate = useNavigate()
    return (
        <div className="text-base">
            <p>Something went wrong 😢</p>
            <p>{errorMessage.data || errorMessage.message}</p>
            <button onClick={() =>navigate(-1)} className="text-sm text-blue-500 hover:underline">&larr; Go back</button>
        </div>
    )
}

export default ErrorPage
