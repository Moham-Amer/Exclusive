import { lazy } from 'react'
import { DefaultLayout } from '../../../shared/layout/default-layout'

const AboutPage = lazy(() => import('../pages'))

export const aboutRoutes = [
  {
    path: "/about",
    element: (
      <DefaultLayout withBreadcrumb={true}>
        <AboutPage />
      </DefaultLayout>
    ),
  }, 
]