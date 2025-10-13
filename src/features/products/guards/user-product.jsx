import { Navigate } from "react-router";

const user = {
    isAuth: true,
}
export function UserProductGuard({ children }) {
    if (user.isAuth) {
        return <>{children}</>
    }

    return <Navigate to='/login' replace />;
}