import { Link } from "react-router-dom"

const NotificationDropdown = (): JSX.Element => {
    return (
        <>
            <li className="dropdown notification-list">
                <Link className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" to="#" role="button"
                    aria-haspopup="false" aria-expanded="false">
                    <i className="ri-notification-3-fill fs-22"></i>
                    <span className="noti-icon-badge"></span>
                </Link>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
                    <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                        <div className="row align-items-center">
                            <div className="col">
                                <h6 className="m-0 fs-16 fw-medium"> Notification</h6>
                            </div>
                            <div className="col-auto">
                                <Link to="#" className="text-dark text-decoration-underline">
                                    <small>Clear All</small>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div style={{ maxHeight: "300px" }} data-simplebar>

                        <h5 className="text-muted fs-12 fw-bold p-2 text-uppercase mb-0">Today</h5>
                        {/* <!-- item--> */}

                        <Link to="#"
                            className="dropdown-item p-0 notify-item unread-noti card m-0 shadow-none">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="notify-icon bg-primary">
                                            <i className="ri-message-3-line fs-18"></i>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 text-truncate ms-2">
                                        <h5 className="noti-item-title fw-medium fs-14">Datacorp <small
                                            className="fw-normal text-muted float-end ms-1">1 min ago</small>
                                        </h5>
                                        <small className="noti-item-subtitle text-muted">Caleb Flakelar commented on
                                            Admin</small>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* <!-- item--> */}
                        <Link to="#"
                            className="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="notify-icon bg-info">
                                            <i className="ri-user-add-line fs-18"></i>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 text-truncate ms-2">
                                        <h5 className="noti-item-title fw-medium fs-14">Admin <small
                                            className="fw-normal text-muted float-end ms-1">1 hr ago</small>
                                        </h5>
                                        <small className="noti-item-subtitle text-muted">New user registered</small>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <h5 className="text-muted fs-12 fw-bold p-2 mb-0 text-uppercase">Yesterday</h5>

                        {/* <!-- item--> */}
                        <Link to="#"
                            className="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="notify-icon">
                                            <img src="/assets/images/users/avatar-2.jpg"
                                                className="img-fluid rounded-circle" alt="" />
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 text-truncate ms-2">
                                        <h5 className="noti-item-title fw-medium fs-14">Cristina Pride <small
                                            className="fw-normal text-muted float-end ms-1">1 day ago</small>
                                        </h5>
                                        <small className="noti-item-subtitle text-muted">Hi, How are you? What about
                                            our next meeting</small>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <h5 className="text-muted fs-12 fw-bold p-2 mb-0 text-uppercase">31 Jan 2023</h5>

                        {/* <!-- item--> */}
                        <Link to="#"
                            className="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="notify-icon bg-primary">
                                            <i className="ri-discuss-line fs-18"></i>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 text-truncate ms-2">
                                        <h5 className="noti-item-title fw-medium fs-14">Datacorp</h5>
                                        <small className="noti-item-subtitle text-muted">Caleb Flakelar commented on
                                            Admin</small>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* <!-- item--> */}
                        <Link to="#"
                            className="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="notify-icon">
                                            <img src="/assets/images/users/avatar-4.jpg"
                                                className="img-fluid rounded-circle" alt="" />
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 text-truncate ms-2">
                                        <h5 className="noti-item-title fw-medium fs-14">Karen Robinson</h5>
                                        <small className="noti-item-subtitle text-muted">Wow ! this admin looks good
                                            and awesome design</small>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* <!-- All--> */}
                    <Link to="#"
                        className="dropdown-item text-center text-primary text-decoration-underline fw-bold notify-item border-top border-light py-2">
                        View All
                    </Link>

                </div>
            </li>
        </>
    );
};

export default NotificationDropdown;