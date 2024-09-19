import { Link } from "react-router-dom";

const LanguageDropdown = (): JSX.Element => {
    return (
        <>
            <li className="dropdown">
                <Link className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" to="#" role="button"
                    aria-haspopup="false" aria-expanded="false">
                    <img src="/assets/images/flags/us.jpg" alt="user-image" className="me-0 me-sm-1" height="12" />
                    <span className="align-middle d-none d-lg-inline-block">English</span> <i
                        className="ri-arrow-down-s-line d-none d-sm-inline-block align-middle"></i>
                </Link>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated">

                    {/* <!-- item--> */}
                    <Link to="#" className="dropdown-item">
                        <img src="/assets/images/flags/germany.jpg" alt="user-image" className="me-1" height="12" />
                        <span className="align-middle">German</span>
                    </Link>

                    {/* <!-- item--> */}
                    <Link to="#" className="dropdown-item">
                        <img src="/assets/images/flags/italy.jpg" alt="user-image" className="me-1" height="12" />
                        <span className="align-middle">Italian</span>
                    </Link>

                    {/* <!-- item--> */}
                    <Link to="#" className="dropdown-item">
                        <img src="/assets/images/flags/spain.jpg" alt="user-image" className="me-1" height="12" />
                        <span className="align-middle">Spanish</span>
                    </Link>

                    {/* <!-- item--> */}
                    <Link to="#" className="dropdown-item">
                        <img src="/assets/images/flags/russia.jpg" alt="user-image" className="me-1" height="12" />
                        <span className="align-middle">Russian</span>
                    </Link>

                </div>
            </li>
        </>
    );
};

export default LanguageDropdown;