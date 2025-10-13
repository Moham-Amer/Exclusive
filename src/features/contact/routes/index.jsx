import { lazy } from 'react'
import { DefaultLayout } from '../../../shared/layout/default-layout'

const ContactPage = lazy(() => import('../pages'))

export const contactRoutes = [
  {
    path: "/contact",
    element: (
      <DefaultLayout withBreadcrumb={true}>
        <ContactPage />
      </DefaultLayout>
    ),
  }, 
]