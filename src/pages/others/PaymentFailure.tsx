import AuthFooter from "../auth/AuthFooter";
import CommonSection from "../auth/CommonSection";

const PaymentFailure = (): JSX.Element => {
    return (
        <>
            {/* CommonSection */}
            {/* <CommonSection /> */}

            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative" style={{background:'rgb(221 243 242)', height:'100vh'}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xxl-10">
                            <div className="card">
                                <div className="card-body p-4">

                                    <div className="text-center">
                                        <img src="/assets/images/svg/maintenance.svg" height="150" alt="File not found" />
                                        <h3 className="mt-4">OOps! Something went wrong </h3>
                                        <p className="text-muted">Your payment has failed</p>
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
            {/* <AuthFooter /> */}
        </>
    );
};

export default PaymentFailure;