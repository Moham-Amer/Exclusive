import { useForm } from 'react-hook-form';
import { FormInput } from '../../../../shared/components/forms/form-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFormSchemaValidation } from './config';
import { useLoginMutation } from '../../services/mutations';
import './style.css';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from '../../../../routes'
import omit from 'lodash/omit';
import { userStorage } from '../../storage';

export function LoginForm() {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(loginFormSchemaValidation)
    });
    const { mutateAsync: login, isPending } = useLoginMutation()
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || appRoutes.Home;



    const onSubmitHandler = handleSubmit(async values => {
        try {
            const response = await login(omit(values))
            // console.log(response)
            userStorage.set(response.id);
            localStorage.setItem('access_token', response.access_token)
            console.log(userStorage.get());
            toast.success('Login successfully');
            navigate(from, { replace: true });
            window.location.reload();
        } catch (e) {
            console.log(e);
            toast.error('Failed to Login');
        }
    })
    return (
        <div
            style={{
                minHeight: "80vh",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 0",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: 48,
                    width: "100%",
                    maxWidth: 1100,
                    background: "#fff",
                    borderRadius: 10,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    padding: "0 0",
                }}
            >
                {/* Image Section */}
                <div className="login-image-section">
                    <img
                        src="/images/auth.png"
                        alt="Shopping"
                        className="login-image"
                    />
                </div>
                {/* Login Form Section */}
                <div
                    style={{
                        flex: "1 1 50%",
                        minWidth: 350,
                        padding: "64px 40px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 12 }}>
                        Log in to Exclusive
                    </h2>
                    <div style={{ color: "#222", marginBottom: 32, fontSize: 15 }}>
                        Enter your details below
                    </div>
                    <form onSubmit={onSubmitHandler}>


                        <FormInput
                            type="text"
                            placeholder="Email"
                            errorMessage={errors.email?.message}
                            {...register('email')}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: "none",
                                borderBottom: "1.5px solid #ccc",
                                padding: "14px 0",
                                fontSize: 16,
                                marginBottom: 28,
                                outline: "none",
                            }}
                        />
                        <FormInput
                            type="password"
                            placeholder="Password"
                            errorMessage={errors.password?.message}
                            {...register('password')}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: "none",
                                borderBottom: "1.5px solid #ccc",
                                padding: "14px 0",
                                fontSize: 16,
                                marginBottom: 32,
                                outline: "none",
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 8,
                                marginBottom: 24,
                            }}
                        >



                            <button
                                type="submit"
                                style={{
                                    background: "#DB4444",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 6,
                                    padding: "20px 38px",
                                    fontSize: 16,
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    transition: "background 0.2s",
                                }}
                            >

                                {isPending ? 'Loading..' : 'Log In'}

                            </button>
                            <a
                                href="#"
                                style={{
                                    color: "#DB4444",
                                    fontSize: 15,
                                    textDecoration: "none",
                                    marginLeft: 16,
                                }}
                            >
                                Forget Password?
                            </a>
                    
                        </div>
                                                   <div style={{ textAlign: "center", color: "#888", fontSize: 15 }}>
                            Don't have an account?{" "}
                            <a
                                href="/sign-up"
                                style={{
                                    color: "#222",
                                    textDecoration: "underline",
                                    marginLeft: 4,
                                    fontWeight: 500,
                                }}
                            >
                                Sign up
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );


    // return (
    //     <form className="sign-up-form-container" onSubmit={onSubmitHandler}>
    //     <p className="sign-up-form-container-header-title">
    //         Sign up
    //     </p>
    //     <FormInput
    //         placeholder="Add name..."
    //         errorMessage={errors.name?.message}
    //         {...register('name')}
    //     />
    //     <FormInput
    //         errorMessage={errors.email?.message}
    //         placeholder="Add email..."
    //         {...register('email')}
    //     />
    //     <FormInput
    //         errorMessage={errors.password?.message}
    //         placeholder="Add password..."
    //         type='password'
    //         {...register('password')}
    //     />
    //     <FormInput
    //         errorMessage={errors.confirmPassword?.message}
    //         placeholder="Confirm Password..."
    //         type='password'
    //         {...register('confirmPassword')}
    //     />
    //     <button className="sign-up-form-container-button">{isPending ? 'Loading..' : 'Sign up'}</button>
    // </form>
    // )
}