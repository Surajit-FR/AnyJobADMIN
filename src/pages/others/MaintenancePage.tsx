import AuthFooter from "../auth/AuthFooter";
import CommonSection from "../auth/CommonSection";

const MaintenancePage = (): JSX.Element => {
    return (
        <>
            {/* CommonSection */}
            <CommonSection />

            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xxl-10">
                            <div className="card">
                                <div className="card-body p-4">

                                    <div className="text-center">
                                        <img src="/assets/images/svg/maintenance.svg" height="150" alt="File not found" />
                                        <h3 className="mt-4">Site is Under Maintenance</h3>
                                        <p className="text-muted">We're making the system more awesome. We'll be back shortly.</p>

                                        <div className="row mt-5">
                                            <div className="col-md-4">
                                                <div className="text-center mt-3 ps-1 pe-1">
                                                    <i
                                                        className="ri-vip-diamond-line bg-primary maintenance-icon text-white mb-4"></i>
                                                    <h5 className="text-uppercase">Why is the Site Down?</h5>
                                                    <p className="text-muted">There are many variations of passages of Lorem Ipsum
                                                        available, but the majority have suffered alteration.</p>
                                                </div>
                                            </div>
                                            {/* <!-- end col--> */}
                                            <div className="col-md-4">
                                                <div className="text-center mt-3 ps-1 pe-1">
                                                    <i className="ri-time-line bg-primary maintenance-icon text-white mb-4"></i>
                                                    <h5 className="text-uppercase">What is the Downtime?</h5>
                                                    <p className="text-muted">Contrary to popular belief, Lorem Ipsum is not simply
                                                        random text. It has roots in a piece of classical but the majority.</p>
                                                </div>
                                            </div>
                                            {/* <!-- end col--> */}
                                            <div className="col-md-4">
                                                <div className="text-center mt-3 ps-1 pe-1">
                                                    <i className="ri-question-mark bg-primary maintenance-icon text-white mb-4"></i>
                                                    <h5 className="text-uppercase">Do you need Support?</h5>
                                                    <p className="text-muted">If you are going to use a passage of Lorem Ipsum, you
                                                        need to be sure there isn't anything embar.. <a href="mailto:#"
                                                            className="text-muted fw-bold">no-reply@domain.com</a></p>
                                                </div>
                                            </div>
                                            {/* <!-- end col--> */}
                                        </div>
                                        {/* <!-- end row--> */}
                                    </div>
                                    {/* <!-- end /.text-center--> */}
                                </div>
                                {/* <!-- end card-body --> */}
                            </div>
                            {/* <!-- end card --> */}

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

export default MaintenancePage;