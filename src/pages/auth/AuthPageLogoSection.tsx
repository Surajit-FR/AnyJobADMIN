import { Link } from "react-router-dom";

const AuthPageLogoSection = (): JSX.Element => {
    return (
        <>
            <div className="card-header pt-4 text-center">
                <div className="auth-brand mb-0">
                    <Link to="/dashboard" className="logo-dark">
                        <span><img src="/assets/images/AnyJobLogo.png" alt="dark logo" height="28" /></span>
                    </Link>
                    <Link to="/dashboard" className="logo-light">
                        <span><img src="/assets/images/AnyJobLogoW.png" alt="logo" height="28" /></span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AuthPageLogoSection;