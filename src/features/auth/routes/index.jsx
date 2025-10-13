import { lazy } from "react"
import { DefaultLayout } from '../../../shared/layout/default-layout';

const SignUpPage = lazy(() => import('../pages/sign-up'));
const LoginPage = lazy(() => import('../pages/login'));
export const authRoutes = [
    {
        path: "/login",
        element:  ( <DefaultLayout withBreadcrumb={true}>
                <LoginPage />
              </DefaultLayout>)
    },
    {
        path: "/sign-up",
        element: (
            <DefaultLayout>
                <SignUpPage />
            </DefaultLayout>
        ),
    },
]