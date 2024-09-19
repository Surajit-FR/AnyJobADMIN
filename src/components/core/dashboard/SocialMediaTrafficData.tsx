import { Link } from "react-router-dom";

const SocialMediaTrafficData = (): JSX.Element => {
    return (
        <>
            <div className="col-xl-4 col-lg-6">
                <div className="card">
                    <div className="d-flex card-header justify-content-between align-items-center">
                        <h4 className="header-title">Social Media Traffic</h4>
                        <Link to="#" className="btn btn-sm btn-success">Export <i
                            className="ri-download-line ms-1"></i></Link>
                    </div>

                    <div className="card-body p-0">

                        <div className="table-responsive">
                            <table className="table table-sm table-centered table-hover table-borderless mb-0">
                                <thead className="border-top border-bottom bg-light-subtle border-light">
                                    <tr>
                                        <th>Network</th>
                                        <th>Visits</th>
                                        <th style={{ width: "40%" }}>Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Facebook</td>
                                        <td>2,250</td>
                                        <td>
                                            <div className="progress" style={{ height: "3px" }}>
                                                <div className="progress-bar" role="progressbar"
                                                    style={{ width: "65%" }} aria-valuenow={65} aria-valuemin={0}
                                                    aria-valuemax={100}></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Instagram</td>
                                        <td>1,501</td>
                                        <td>
                                            <div className="progress" style={{ height: "3px" }}>
                                                <div className="progress-bar" role="progressbar"
                                                    style={{ width: "45%" }} aria-valuenow={45} aria-valuemin={0}
                                                    aria-valuemax={100}></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Twitter</td>
                                        <td>750</td>
                                        <td>
                                            <div className="progress" style={{ height: "3px" }}>
                                                <div className="progress-bar" role="progressbar"
                                                    style={{ width: "30%" }} aria-valuenow={30} aria-valuemin={0}
                                                    aria-valuemax={100}></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>LinkedIn</td>
                                        <td>540</td>
                                        <td>
                                            <div className="progress" style={{ height: "3px" }}>
                                                <div className="progress-bar" role="progressbar"
                                                    style={{ width: "25%" }} aria-valuenow={25} aria-valuemin={0}
                                                    aria-valuemax={100}></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Other</td>
                                        <td>13,851</td>
                                        <td>
                                            <div className="progress" style={{ height: "3px" }}>
                                                <div className="progress-bar" role="progressbar"
                                                    style={{ width: "52%" }} aria-valuenow={52} aria-valuemin={0}
                                                    aria-valuemax={100}></div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SocialMediaTrafficData;