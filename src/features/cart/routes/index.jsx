import { lazy } from 'react'
import { DefaultLayout } from '../../../shared/layout/default-layout'
import { AuthGuard } from '../../auth/guards/auth-guard'
import { BrowserRouter } from "react-router-dom";

const CartPage = lazy(() => import('../pages'))
const CheckoutPage = lazy(() => import('../pages/checkout'))

export const cartRoutes = [
    {
        path: "/cart", // Ex: my-app.com/cart
        element: (
            <DefaultLayout withBreadcrumb={true}>
                <CartPage />
            </DefaultLayout>
        ),
    },

    {
        path: "/cart/checkout",
        element: (
            <DefaultLayout withBreadcrumb={true}>
                {/* <BrowserRouter> */}
                    <AuthGuard>
                        <CheckoutPage />
                    </AuthGuard>
                {/* </BrowserRouter> */}
            </DefaultLayout>
        ),
    },
]