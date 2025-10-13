import {Breadcrumb} from "../../components/breadcrumb/index"
import { Footer } from "../footer";
import { Navbar } from "../navbar";
import './style.css';

export function LayoutContainer({ children , withBreadcrumb = true,}) {
    return (
        <>
            <Navbar />
            {withBreadcrumb ? <div className="breadcrumb-container"><Breadcrumb /></div> : null}
            <main className="app-continer">
                {children}
            </main>
           <Footer /> 
        </>
    )
}