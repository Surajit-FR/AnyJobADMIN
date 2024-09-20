const ProfileDetails = (): JSX.Element => {
    return (
        <>
            <div className="col-xl-4 col-lg-5">
                <div className="card text-center">
                    <div className="card-body">
                        <img src="/assets/images/users/avatar-1.jpg" className="rounded-circle avatar-lg img-thumbnail" alt="profile-image" />

                        <h4 className="mb-1 mt-2">Doris Minner</h4>
                        <p className="text-muted">Founder</p>

                        <div className="text-start mt-3">
                            <h4 className="fs-13 text-uppercase">About Me :</h4>
                            <p className="text-muted mb-3">
                                Hi I'm Tosha Minner,has been the industry's standard dummy text ever since the
                                1500s, when an unknown printer took a galley of type.
                            </p>
                            <p className="text-muted mb-2"><strong>Full Name :</strong> <span className="ms-2">Tosha K. Minner</span></p>

                            <p className="text-muted mb-2"><strong>Mobile :</strong><span className="ms-2">(123)
                                123 1234</span></p>

                            <p className="text-muted mb-2"><strong>Email :</strong> <span className="ms-2 ">user@email.domain</span></p>

                            <p className="text-muted mb-1"><strong>Location :</strong> <span className="ms-2">USA</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileDetails;