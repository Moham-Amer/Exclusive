import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { BlankLayout } from "../shared/layout/blank-layout";
import { homeRoutes } from '../features/home/routes'
import { authRoutes } from '../features/auth/routes'
import { lazy } from "react";
import { LayoutContainer } from "../shared/layout/layout-container";
import { contactRoutes } from "../features/contact/routes";
import { aboutRoutes } from "../features/about/routes";
import { productsRoutes } from "../features/products/routes";
import { cartRoutes } from "../features/cart/routes";
import { wishlistRoutes } from "../features/wishlist/routes";
import { ErrorPage } from "../shared/pages/error-page";

const NotFoundPage = lazy(() => import('../shared/pages/not-found-page/not-found-page'))

/**
 * Ex: my-app.com
 * list of producst: my-app.com/products
 * list of sub producst: my-app.com/user-products
 * list of sub producst: my-app.com/products/users
 * one of producst (Details): my-app.com/products/:id
 * 
 * Wrong: 
 * * list of sub producst: my-app.com/getProducts
 * * list of sub producst: my-app.com/user_Products
 * * one of producst (Details): my-app.com/products?id=1
 */

const routes = [
    {
        path: '/',
        element: <Outlet />,
        errorElement: <ErrorPage />,
        children: [
            ...homeRoutes,
            ...contactRoutes,
            ...aboutRoutes,
            ...authRoutes,
            ...productsRoutes,
            ...cartRoutes,
            ...wishlistRoutes,
            {
                path: '*',
                element: (
                    <LayoutContainer withBreadcrumb={true}>
                        <NotFoundPage />
                    </LayoutContainer>
                ),
            }
        ]
    }
]

const router = createBrowserRouter(routes);

export function AppRouterProvider() {
    return (
        <RouterProvider router={router} />
    )
}