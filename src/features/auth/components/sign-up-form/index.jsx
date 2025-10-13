import { useForm } from 'react-hook-form';
import { FormInput } from '../../../../shared/components/forms/form-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpFormSchemaValidation } from './config';
import { useLoginMutation } from '../../services/mutations';
import './style.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../../routes'
import omit from 'lodash/omit';
import { userStorage } from '../../storage';

export function SignUpForm() {
        const { register, formState: { errors }, handleSubmit } = useForm({
            resolver: yupResolver(signUpFormSchemaValidation)
        });
        const { mutateAsync: login, isPending } = useLoginMutation()
        const navigate = useNavigate();
    
        const onSubmitHandler = handleSubmit(async values => {
            try {
                const response = await login(omit(values))
                // console.log(response)
                userStorage.set(response.id);
                localStorage.setItem('access_token', response.access_token)
                console.log(userStorage.get());
                toast.success('Login successfully');
                navigate(appRoutes.Home)
                window.location.reload();
            } catch (e) {
                console.log(e);
                toast.error('Failed to Login');
            }
        })
    
    // const { register, formState: { errors }, handleSubmit } = useForm({
    //     resolver: yupResolver(signUpFormSchemaValidation)
    // });
    // const { mutateAsync: signUp, isPending } = useSignUpMutation()
    // const navigate = useNavigate();

    // const onSubmitHandler = handleSubmit(async values => {
    //     try {
    //         const response = await signUp(omit(values))
    //         userStorage.set(response.id);
    //         toast.success('Sign up successfully');
    //         navigate(appRoutes.home)
    //     } catch (e) {
    //         console.log(e);
    //         toast.error('Failed to sign up');
    //     }
    // })

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
                <div
                    style={{
                        flex: "1 1 50%",
                        minWidth: 350,
                        background: "#f6f6f6",
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "32px 0",
                    }}
                >
                    <img
                        src="../public/images/auth.png"
                        alt="Shopping"
                        style={{
                            width: "90%",
                            maxWidth: 450,
                            borderRadius: 8,
                            objectFit: "cover",
                        }}
                    />
                </div>
                {/* Signup Form Section */}
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
                        Create an account
                    </h2>
                    <div style={{ color: "#222", marginBottom: 32, fontSize: 15 }}>
                        Enter your details below
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        <FormInput
                            type="text"
                            placeholder="Name"
                            errorMessage={errors.name?.message}
                            {...register('name')}
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
                            errorMessage={errors.password?.message}
                            placeholder="Password"
                            type='password'
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
                        <button
                            type="submit"
                            style={{
                                background: "#DB4444",
                                color: "#fff",
                                border: "none",
                                borderRadius: 6,
                                padding: "12px 0",
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: "pointer",
                                width: "100%",
                                marginBottom: 18,
                                transition: "background 0.2s",
                            }}
                        >
                            {isPending ? 'Loading..' : 'Create Account'}
                        </button>
                        <button
                            type="button"
                            style={{
                                background: "#fff",
                                color: "#222",
                                border: "1.5px solid #ccc",
                                borderRadius: 6,
                                padding: "12px 0",
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: "pointer",
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 10,
                                marginBottom: 24,
                            }}
                        >
                            {/* <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="Google"
                                style={{ width: 22, height: 22 }}
                            /> */}
                            Sign up with Google
                        </button>
                        <div style={{ textAlign: "center", color: "#888", fontSize: 15 }}>
                            Already have account?{" "}
                            <a
                                href="/login"
                                style={{
                                    color: "#222",
                                    textDecoration: "underline",
                                    marginLeft: 4,
                                    fontWeight: 500,
                                }}
                            >
                                Log in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}