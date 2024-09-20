// import { Link } from "react-router-dom";

const Footer = (): JSX.Element => {
    return (
        <>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            {new Date().getFullYear()} © AnyJob - anyjob.com
                        </div>
                        {/* <div className="col-md-6">
                            <div className="text-md-end footer-links d-none d-md-block">
                                <Link to="#">About</Link>
                                <Link to="#">Support</Link>
                                <Link to="#">Contact Us</Link>
                            </div>
                        </div> */}
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;