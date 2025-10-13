import { lazy } from 'react'
import { DefaultLayout } from '../../../shared/layout/default-layout'

const WishlistPage = lazy(() => import('../pages'))

export const wishlistRoutes = [
    {
        path: "/wishlist", 
        element: (
            <DefaultLayout withBreadcrumb={true}>
                <WishlistPage />
            </DefaultLayout>
        ),
    },

    
]