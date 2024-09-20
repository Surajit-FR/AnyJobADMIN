import { Link } from 'react-router-dom';

const UserDropdown = (): JSX.Element => {
    return (
        <>
            <li className="dropdown me-md-2">
                <Link className="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown" to="#"
                    role="button" aria-haspopup="false" aria-expanded="false">
                    <span className="account-user-avatar">
                        <img src="/assets/images/users/avatar-1.jpg" alt="user-image" width="32"
                            className="rounded-circle" />
                    </span>
                    <span className="d-lg-flex flex-column gap-1 d-none">
                        <h5 className="my-0">Doris Larson</h5>
                        <h6 className="my-0 fw-normal">Founder</h6>
                    </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
                    {/* <!-- item--> */}
                    <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome !</h6>
                    </div>

                    {/* <!-- item--> */}
                    <Link to="/profile" className="dropdown-item">
                        <i className="ri-account-circle-fill align-middle me-1"></i>
                        <span>My Account</span>
                    </Link>

                    {/* <!-- item--> */}
                    <Link className="dropdown-item" data-bs-toggle="offcanvas" to="#theme-settings-offcanvas">
                        <i className="ri-settings-4-fill align-middle me-1"></i>
                        <span>Settings</span>
                    </Link>

                    {/* <!-- item--> */}
                    <Link to="/logout-page" className="dropdown-item">
                        <i className="ri-logout-circle-line align-middle me-1"></i>
                        <span>Logout</span>
                    </Link>
                </div>
            </li>
        </>
    );
};

export default UserDropdown;