import { Link } from "react-router-dom";

const SearchSuggestionSection = (): JSX.Element => {
    return (
        <>
            <div className="app-search dropdown d-none d-lg-block">
                <form>
                    <div className="input-group">
                        <input type="search" className="form-control dropdown-toggle" placeholder="Search..." id="top-search" />
                        <span className="ri-search-line search-icon"></span>
                    </div>
                </form>

                <div className="dropdown-menu dropdown-menu-animated dropdown-lg" id="search-dropdown">
                    {/* <!-- item--> */}
                    <div className="dropdown-header noti-title">
                        <h5 className="text-overflow mb-1">Found <b className="text-decoration-underline">08</b> results
                        </h5>
                    </div>

                    {/* <!-- item--> */}
                    <Link to="#" className="dropdown-item notify-item">
                        <i className="ri-file-chart-line fs-16 me-1"></i>
                        <span>Analytics Report</span>
                    </Link>

                    {/* <!-- item--> */}
                    <Link to="#" className="dropdown-item notify-item">
                        <i className="ri-lifebuoy-line fs-16 me-1"></i>
                        <span>How can I help you?</span>
                    </Link>

                    {/* <!-- item--> */}
                    <Link to="#" className="dropdown-item notify-item">
                        <i className="ri-user-settings-line fs-16 me-1"></i>
                        <span>User profile settings</span>
                    </Link>

                    {/* <!-- item--> */}
                    <div className="dropdown-header noti-title">
                        <h6 className="text-overflow mt-2 mb-1 text-uppercase">Users</h6>
                    </div>

                    <div className="notification-list">
                        {/* <!-- item--> */}
                        <Link to="#" className="dropdown-item notify-item">
                            <div className="d-flex">
                                <img className="d-flex me-2 rounded-circle" src="/assets/images/users/avatar-2.jpg"
                                    alt="Generic placeholder" height="32" />
                                <div className="w-100">
                                    <h5 className="m-0 fs-14">Erwin Brown</h5>
                                    <span className="fs-12 mb-0">UI Designer</span>
                                </div>
                            </div>
                        </Link>

                        {/* <!-- item--> */}
                        <Link to="#" className="dropdown-item notify-item">
                            <div className="d-flex">
                                <img className="d-flex me-2 rounded-circle" src="/assets/images/users/avatar-5.jpg"
                                    alt="Generic placeholder" height="32" />
                                <div className="w-100">
                                    <h5 className="m-0 fs-14">Jacob Deo</h5>
                                    <span className="fs-12 mb-0">Developer</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchSuggestionSection;