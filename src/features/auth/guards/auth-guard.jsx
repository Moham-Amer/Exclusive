import { useLocation, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

export function AuthGuard({ children }) {
    const location = useLocation();
    if (localStorage.getItem('access_token')) {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
}