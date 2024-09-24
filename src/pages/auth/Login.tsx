import { Link } from "react-router-dom";
import AuthFooter from "./AuthFooter";
import CommonSection from "./CommonSection";
import AuthPageLogoSection from "./AuthPageLogoSection";

const Login = (): JSX.Element => {
    return (
        <>
            {/* CommonSection */}
            <CommonSection />

            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xxl-4 col-lg-5">
                            <div className="card">

                                {/* <!-- Logo --> */}
                                <AuthPageLogoSection />

                                <div className="card-body p-4">
                                    <div className="text-center w-75 m-auto">
                                        <h4 className="text-dark-50 text-center pb-0">Sign In</h4>
                                        <p className="text-muted mb-4">Enter your email and password to access the admin panel.</p>
                                    </div>

                                    <form action="#">
                                        <div className="mb-3">
                                            <label htmlFor="emailaddress" className="form-label">Email address</label>
                                            <input className="form-control" type="email" id="emailaddress" required={true}
                                                placeholder="Enter your email" />
                                        </div>

                                        <div className="mb-3">
                                            <Link to="/recovery-password" className="text-muted float-end fs-12">Forgot your password?</Link>
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <div className="input-group input-group-merge">
                                                <input type="password" id="password" className="form-control"
                                                    placeholder="Enter your password" />
                                                <div className="input-group-text" data-password="false">
                                                    <span className="password-eye"></span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="mb-3">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="checkbox-signin" checked />
                                                <label className="form-check-label" htmlFor="checkbox-signin">Remember me</label>
                                            </div>
                                        </div> */}

                                        <div className="mb-3 mb-0 text-center">
                                            <button className="btn btn-primary" type="submit"> Log In </button>
                                        </div>
                                    </form>
                                </div>
                                {/* end card-body */}
                            </div>
                            {/* end card */}

                            <div className="row mt-3">
                                <div className="col-12 text-center">
                                    <p className="text-white-50">Don't have an account? <Link to="/register"
                                        className="text-white ms-1 link-offset-3 text-decoration-underline"><b>Sign Up</b></Link></p>
                                </div>
                            </div>
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