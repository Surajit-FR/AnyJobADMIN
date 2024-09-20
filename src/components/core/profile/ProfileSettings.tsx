import { Link } from "react-router-dom";

const ProfileSettings = (): JSX.Element => {
    return (
        <>
            <div className="col-xl-8 col-lg-7">
                <div className="card">
                    <div className="card-body">
                        <ul className="nav nav-pills bg-nav-pills nav-justified mb-3">
                            <li className="nav-item">
                                <Link to="#settings" data-bs-toggle="tab" aria-expanded="false" className="nav-link rounded-end rounded-0 active">
                                    Settings
                                </Link>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane show active" id="settings">
                                <form>
                                    <h5 className="mb-4 text-uppercase"><i className="ri-contacts-book-2-line me-1"></i> Personal Info</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="firstname" className="form-label">First Name</label>
                                                <input type="text" className="form-control" id="firstname" placeholder="Enter first name" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="lastname" className="form-label">Last Name</label>
                                                <input type="text" className="form-control" id="lastname" placeholder="Enter last name" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label htmlFor="userbio" className="form-label">Bio</label>
                                                <textarea className="form-control" id="userbio" rows={4} placeholder="Write something..."></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="useremail" className="form-label">Email Address</label>
                                                <input type="email" className="form-control" id="useremail" placeholder="Enter email" />
                                                <span className="form-text text-muted"><small>If you want to change email please <Link to="#">click</Link> here.</small></span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="userpassword" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="userpassword" placeholder="Enter password" />
                                                <span className="form-text text-muted"><small>If you want to change password please <Link to="#">click</Link> here.</small></span>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="mb-3 text-uppercase bg-light p-2"><i className="ri-building-line me-1"></i> Company Info</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="companyname" className="form-label">Company Name</label>
                                                <input type="text" className="form-control" id="companyname" placeholder="Enter company name" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="cwebsite" className="form-label">Website</label>
                                                <input type="text" className="form-control" id="cwebsite" placeholder="Enter website url" />
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="mb-3 text-uppercase bg-light p-2"><i className="ri-global-line me-1"></i> Social</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="social-fb" className="form-label">Facebook</label>
                                                <div className="input-group">
                                                    <span className="input-group-text"><i className="ri-facebook-fill"></i></span>
                                                    <input type="text" className="form-control" id="social-fb" placeholder="Url" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="social-tw" className="form-label">Twitter</label>
                                                <div className="input-group">
                                                    <span className="input-group-text"><i className="ri-twitter-line"></i></span>
                                                    <input type="text" className="form-control" id="social-tw" placeholder="Username" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="social-insta" className="form-label">Instagram</label>
                                                <div className="input-group">
                                                    <span className="input-group-text"><i className="ri-instagram-line"></i></span>
                                                    <input type="text" className="form-control" id="social-insta" placeholder="Url" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="social-lin" className="form-label">Linkedin</label>
                                                <div className="input-group">
                                                    <span className="input-group-text"><i className="ri-linkedin-fill"></i></span>
                                                    <input type="text" className="form-control" id="social-lin" placeholder="Url" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="social-sky" className="form-label">Skype</label>
                                                <div className="input-group">
                                                    <span className="input-group-text"><i className="ri-skype-line"></i></span>
                                                    <input type="text" className="form-control" id="social-sky" placeholder="@username" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="social-gh" className="form-label">Github</label>
                                                <div className="input-group">
                                                    <span className="input-group-text"><i className="ri-github-line"></i></span>
                                                    <input type="text" className="form-control" id="social-gh" placeholder="Username" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-end">
                                        <button type="submit" className="btn btn-success mt-2"><i className="ri-save-line"></i> Save</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSettings;