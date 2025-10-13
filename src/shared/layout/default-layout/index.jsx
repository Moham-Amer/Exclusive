import { LayoutContainer } from "../layout-container";

export function DefaultLayout({ children , withBreadcrumb = true }) {
    return (
        <LayoutContainer   withBreadcrumb = {withBreadcrumb} >
            {children}
        </LayoutContainer>
    )
}