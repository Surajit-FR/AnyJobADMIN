import { Link } from "react-router-dom";

const ApplicationDropdown = (): JSX.Element => {
    return (
        <>
            <li className="dropdown d-none d-sm-inline-block">
                <Link className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" to="#" role="button"
                    aria-haspopup="false" aria-expanded="false">
                    <i className="ri-apps-2-fill fs-22"></i>
                </Link>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg p-0">
                    <div className="p-2">
                        <div className="row g-0">
                            <div className="col">
                                <Link className="dropdown-icon-item" to="#">
                                    <img src="/assets/images/brands/github.png" alt="Github" />
                                    <span>GitHub</span>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="dropdown-icon-item" to="#">
                                    <img src="/assets/images/brands/bitbucket.png" alt="bitbucket" />
                                    <span>Bitbucket</span>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="dropdown-icon-item" to="#">
                                    <img src="/assets/images/brands/dropbox.png" alt="dropbox" />
                                    <span>Dropbox</span>
                                </Link>
                            </div>
                        </div>

                        <div className="row g-0">
                            <div className="col">
                                <Link className="dropdown-icon-item" to="#">
                                    <img src="/assets/images/brands/slack.png" alt="slack" />
                                    <span>Slack</span>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="dropdown-icon-item" to="#">
                                    <img src="/assets/images/brands/dribbble.png" alt="dribbble" />
                                    <span>Dribbble</span>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="dropdown-icon-item" to="#">
                                    <img src="/assets/images/brands/behance.png" alt="Behance" />
                                    <span>Behance</span>
                                </Link>
                            </div>
                            {/* </div> <!-- end row--> */}
                        </div>

                    </div>
                </div>
            </li>
        </>
    );
};

export default ApplicationDropdown;