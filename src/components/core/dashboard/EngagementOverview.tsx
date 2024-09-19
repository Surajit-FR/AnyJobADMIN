import { Link } from "react-router-dom";

const EngagementOverview = (): JSX.Element => {
    return (
        <>
            <div className="col-xl-4 col-lg-12">
                <div className="card">
                    <div className="d-flex card-header justify-content-between align-items-center">
                        <h4 className="header-title">Engagement Overview</h4>
                        <Link to="#" className="btn btn-sm btn-success">Export <i
                            className="ri-download-line ms-1"></i></Link>
                    </div>

                    <div className="card-body p-0">

                        <div className="table-responsive">
                            <table className="table table-sm table-centered table-hover table-borderless mb-0">
                                <thead className="border-top border-bottom bg-light-subtle border-light">
                                    <tr>
                                        <th>Duration (Secs)</th>
                                        <th style={{ width: "30%" }}>Sessions</th>
                                        <th style={{ width: "30%" }}>Views</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>0-30</td>
                                        <td>2,250</td>
                                        <td>4,250</td>
                                    </tr>
                                    <tr>
                                        <td>31-60</td>
                                        <td>1,501</td>
                                        <td>2,050</td>
                                    </tr>
                                    <tr>
                                        <td>61-120</td>
                                        <td>750</td>
                                        <td>1,600</td>
                                    </tr>
                                    <tr>
                                        <td>121-240</td>
                                        <td>540</td>
                                        <td>1,040</td>
                                    </tr>
                                    <tr>
                                        <td>141-420</td>
                                        <td>56</td>
                                        <td>886</td>
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

export default EngagementOverview;