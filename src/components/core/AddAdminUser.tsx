const AddAdminUser = (): JSX.Element => {
    return (
        <>
            <div className="modal fade" id="custom-modal" tabIndex={-1} aria-labelledby="customModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="customModalLabel">Add Admin User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="needs-validation p-2">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="position-relative mb-3">
                                            <label className="form-label" htmlFor="validationTooltip01">First name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="validationTooltip01"
                                                placeholder="First name"
                                            />
                                            <div className="invalid-tooltip">
                                                Please enter first name.
                                            </div>
                                        </div>
                                        <div className="position-relative mb-3">
                                            <label className="form-label" htmlFor="validationTooltip02">Last name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="validationTooltip02"
                                                placeholder="Last name"
                                            />
                                            <div className="invalid-tooltip">
                                                Please enter last name.
                                            </div>
                                        </div>
                                        <div className="position-relative mb-3">
                                            <label className="form-label" htmlFor="validationTooltip04">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="validationTooltip04"
                                                placeholder="Email"
                                            />
                                            <div className="invalid-tooltip">
                                                Please provide a valid state.
                                            </div>
                                        </div>
                                        <div className="position-relative mb-3">
                                            <label className="form-label" htmlFor="validationTooltip05">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="validationTooltip05"
                                                placeholder="Phone"
                                            />
                                            <div className="invalid-tooltip">
                                                Please provide a valid zip.
                                            </div>
                                        </div>
                                        <div className="position-relative mb-3">
                                            <label className="form-label" htmlFor="validationTooltip05">Single User Role</label>
                                            <select className="form-control">
                                                <option>Select</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Finance">Finance</option>
                                            </select>
                                            <div className="invalid-tooltip">
                                                Please provide a valid zip.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAdminUser;