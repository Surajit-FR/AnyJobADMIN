import { Link } from "react-router-dom";
import AuthFooter from "./AuthFooter";
import CommonSection from "./CommonSection";

const RegisterPage = (): JSX.Element => {
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
                                <div className="card-header pt-4 text-center">
                                    <div className="auth-brand mb-0">
                                        <Link to="/dashboard" className="logo-dark">
                                            <span><img src="/assets/images/logo-dark.png" alt="dark logo" height="28" /></span>
                                        </Link>
                                        <Link to="/dashboard" className="logo-light">
                                            <span><img src="/assets/images/logo.png" alt="logo" height="28" /></span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="card-body p-4">

                                    <div className="text-center w-75 m-auto">
                                        <h4 className="text-dark-50 text-center mt-0">Free Sign Up</h4>
                                        <p className="text-muted mb-4">Don't have an account? Create your account, it takes less than a minute </p>
                                    </div>

                                    <form action="#">

                                        <div className="mb-3">
                                            <label htmlFor="fullname" className="form-label">Full Name</label>
                                            <input className="form-control" type="text" id="fullname" placeholder="Enter your name" required />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="emailaddress" className="form-label">Email address</label>
                                            <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <div className="input-group input-group-merge">
                                                <input type="password" id="password" className="form-control" placeholder="Enter your password" />
                                                <div className="input-group-text" data-password="false">
                                                    <span className="password-eye"></span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="mb-3">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="checkbox-signup" />
                                                <label className="form-check-label" htmlFor="checkbox-signup">I accept <Link to="#" className="text-muted">Terms and Conditions</Link></label>
                                            </div>
                                        </div> */}

                                        <div className="mb-3 text-center">
                                            <button className="btn btn-primary" type="submit"> Sign Up </button>
                                        </div>

                                    </form>
                                </div>
                                {/* <!-- end card-body --> */}
                            </div>
                            {/* <!-- end card --> */}

                            <div className="row mt-3">
                                <div className="col-12 text-center">
                                    <p className="text-white-50">Already have account? <Link to="/login" className="text-white ms-1 link-offset-3 text-decoration-underline"><b>Log In</b></Link></p>
                                </div>
                                {/* <!-- end col--> */}
                            </div>
                            {/* <!-- end row --> */}

                        </div>
                        {/* <!-- end col --> */}
                    </div>
                    {/* <!-- end row --> */}
                </div>
                {/* <!-- end container --> */}
            </div>

            {/* AuthFooter */}
            <AuthFooter />
        </>
    );
};

export default RegisterPage;