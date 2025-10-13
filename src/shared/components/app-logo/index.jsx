import { useNavigate } from "react-router-dom"
import { appRoutes } from "../../../routes"

export function AppLogo() {
    const navigate = useNavigate()
    
    return (
        <a className="header-logo" onClick={() => navigate(appRoutes.Home)}>
            <img src="/images/website-logo.svg" alt="logo" width="70" height="70" />
        </a>
    )
}