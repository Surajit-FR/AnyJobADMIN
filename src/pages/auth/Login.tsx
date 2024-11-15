import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import AuthFooter from "./AuthFooter";
import CommonSection from "./CommonSection";
import AuthPageLogoSection from "./AuthPageLogoSection";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { AuthLoginRequest } from "../../store/reducers/AuthReducers";
import { isAuthLoading } from "../../utils/loading";
import PreLoader from "../../components/PreLoader";

type LoginFormData = {
    email: string;
    password: string;
    isAdminPanel: boolean;
};

const Login = (): JSX.Element => {
    const auth = useSelector((state: RootState) => state.authSlice);
    const LOADING = isAuthLoading(auth);

    const dispatch: AppDispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    const onSubmit = (data: LoginFormData): void => {
        dispatch(AuthLoginRequest({ data: { ...data, isAdminPanel: true }, navigate }));
    };

    return (
        <>
            <PreLoader loading={LOADING} />

            {/* CommonSection */}
            <CommonSection />

            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xxl-4 col-lg-5">
                            <div className="card">

                                {/* Logo Section */}
                                <AuthPageLogoSection />

                                <div className="card-body p-4">
                                    <div className="text-center w-75 m-auto">
                                        <h4 className="text-dark-50 text-center pb-0">Sign In</h4>
                                        <p className="text-muted mb-4">
                                            Enter your email and password to access the admin panel.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="position-relative mb-3">
                                            <label htmlFor="emailaddress" className="form-label">
                                                Email address
                                            </label>
                                            <input
                                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                type="email"
                                                id="emailaddress"
                                                placeholder="Enter your email"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: "Enter a valid email address",
                                                    },
                                                })}
                                            />
                                            {errors.email && (
                                                <div className="invalid-tooltip" style={{ display: "block" }}>
                                                    {errors.email.message}
                                                </div>
                                            )}
                                        </div>

                                        <div className="position-relative mb-3">
                                            <Link
                                                to="/recovery-password"
                                                className="text-muted float-end fs-12"
                                            >
                                                Forgot your password?
                                            </Link>
                                            <label htmlFor="password" className="form-label">
                                                Password
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <input
                                                    type={`${showPassword ? "text" : "password"}`}
                                                    id="password"
                                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                                    placeholder="Enter your password"
                                                    {...register("password", {
                                                        required: "Password is required",
                                                        minLength: {
                                                            value: 6,
                                                            message: "Password must be at least 6 characters",
                                                        },
                                                    })}
                                                />
                                                <div onClick={() => setShowPassword(!showPassword)}
                                                    className={`input-group-text ${showPassword ? "show-password" : ""}`}
                                                    data-password={`${showPassword ? "true" : "false"}`}
                                                >
                                                    <span className="password-eye"></span>
                                                </div>
                                                {errors.password && (
                                                    <div className="invalid-tooltip" style={{ display: "block" }}>
                                                        {errors.password.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-3 mb-0 text-center">
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                            >
                                                Log In
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                {/* end card-body */}
                            </div>
                            {/* end card */}

                            {/* <div className="row mt-3">
                                <div className="col-12 text-center">
                                    <p className="text-white-50">
                                        Don't have an account?{" "}
                                        <Link
                                            to="/register"
                                            className="text-white ms-1 link-offset-3 text-decoration-underline"
                                        >
                                            <b>Sign Up</b>
                                        </Link>
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* AuthFooter */}
            <AuthFooter />
        </>
    );
};

export default Login;