import { useLocation, Navigate } from "react-router-dom";

export function UserProductGuard({ children }) {
    const location = useLocation();
    if (localStorage.getItem('access_token')) {
        return <>{children}</>;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
}