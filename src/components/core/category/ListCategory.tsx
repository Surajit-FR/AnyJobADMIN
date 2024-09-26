import { Link } from "react-router-dom";

const ListCategory = (): JSX.Element => {
    return (
        <>
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="header-title mb-3">List Category</h4>

                        <div className="card mb-2 shadow-none border">
                            <div className="p-1">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <div className="avatar-sm">
                                            <img src="/assets/images/users/avatar-9.jpg" className="me-2 rounded-circle" height="36" alt="Arya Stark" />
                                        </div>
                                    </div>
                                    <div className="col ps-0">
                                        <Link to="#" className="text-muted fw-bold">Category One</Link>
                                    </div>
                                    <div className="col-auto px-2" id="tooltip-container9">
                                        <Link to="#" data-bs-container="#tooltip-container9" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete"
                                            className="btn btn-link btn-lg p-0">
                                            <i className='ri-information-line'></i>
                                        </Link>

                                        <Link to="#" data-bs-container="#tooltip-container9" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Download"
                                            className="btn btn-link text-muted btn-lg p-0 mx-2">
                                            <i className='ri-pencil-line'></i>
                                        </Link>

                                        <Link to="#" data-bs-container="#tooltip-container9" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Download"
                                            className="btn btn-link text-danger btn-lg p-0">
                                            <i className='ri-delete-bin-line'></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListCategory;