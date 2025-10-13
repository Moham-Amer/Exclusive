import { AppLogo } from "../../components/app-logo";
import { LayoutContainer } from "../layout-container";

export function BlankLayout({ children }) {
    return (
        <main style={{ padding: '3rem 4rem' }}>
            <AppLogo />
            <LayoutContainer withBreadcrumb = {false} >
                {children}
            </LayoutContainer>
        </main>
    )
}