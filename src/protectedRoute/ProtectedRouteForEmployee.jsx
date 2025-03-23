/* eslint-disable react/prop-types */
import { Navigate } from "react-router"

export const ProtectedRouteForEmployee = ({children}) => {
    const user = JSON.parse(localStorage.getItem('users'))
    if (user?.role === "employee") {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }
}