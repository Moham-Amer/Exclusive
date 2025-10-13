import { lazy } from 'react'
import { DefaultLayout } from '../../../shared/layout/default-layout'

const ProductsPage = lazy(() => import('../pages'))
const ProductFormPage = lazy(() => import('../pages/form'))
const ProductDetailPage = lazy(() => import('../pages/details'))

export const productsRoutes = [
  {
    path: "/products", // Ex: my-app.com/products
    element: (
      <DefaultLayout>
        <ProductsPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/products/form", // Ex: my-app.com/products/form
    element: (
      <DefaultLayout>
        <ProductFormPage />
      </DefaultLayout>
    )
  },
  {
    path: "/products/:id", 
    element: (
      <DefaultLayout>
        <ProductDetailPage  />
      </DefaultLayout>
    )
  }
]