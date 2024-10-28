import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import PageTitle from "../../PageTitle";
import { useEffect } from "react";
import { getUserDetailsRequest, verifyServiceProviderUserDetailsRequest } from "../../../store/reducers/UserReducers";
import { Link, useParams } from "react-router-dom";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Service Provider List", link: "/service-provider-list" },
    { label: "Service Provider Details" },
];

const ServiceProviderDetails = (): JSX.Element => {
    const { service_providerId } = useParams();
    const { userData } = useSelector((state: RootState) => state.userSlice);
    const dispatch: AppDispatch = useDispatch();

    const { firstName, lastName, email, phone, isVerified, additionalInfo, userAddress } = userData || {};
    const additional = additionalInfo?.[0];

    useEffect(() => {
        dispatch(getUserDetailsRequest({ userId: service_providerId }));
    }, [dispatch, service_providerId]);

    const handleVerifyClick = () => {
        dispatch(verifyServiceProviderUserDetailsRequest({ userId: service_providerId, isVerified: !isVerified }));
    };

    return (
        <>
            <PageTitle pageName="Service Provider Details" breadcrumbs={breadcrumbs} />

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        {/* Personal Information */}
                        <div className="col-md-4">
                            <h5 className="mb-3 text-uppercase text-decoration-underline">Personal Information</h5>
                            <div>
                                <strong>Name:</strong> {firstName} {lastName} {isVerified ? <span className="text-success">(Verified)</span> : <span className="text-danger">(Unverified)</span>}
                            </div>
                            <div><strong>DOB:</strong> {new Date(additional?.DOB ?? "").toLocaleDateString()}</div>
                            <div><strong>Email:</strong> {email}</div>
                            <div><strong>Phone:</strong> {phone}</div>
                            <div><strong>Driver License:</strong> {additional?.driverLicense ?? ""}</div>
                        </div>

                        {/* Company Information */}
                        <div className="col-md-4">
                            <h5 className="mb-3 text-uppercase text-decoration-underline">Company Information</h5>
                            {additional ? (
                                <>
                                    <div><strong>Company Name:</strong> {additional?.companyName}</div>
                                    <div><strong>Business Name:</strong> {additional?.businessName}</div>
                                    <div><strong>Introduction:</strong> {additional?.companyIntroduction}</div>
                                    <div><strong>EIN:</strong> {additional?.EIN}</div>
                                    <div><strong>Company License:</strong> {additional?.companyLicense}</div>
                                    <div><strong>Insurance Policy:</strong> {additional?.insurancePolicy}</div>
                                </>
                            ) : (
                                <div>No additional information available.</div>
                            )}
                        </div>

                        {/* Address Information */}
                        <div className="col-md-4">
                            <h5 className="mb-3 text-uppercase text-decoration-underline">Address Information</h5>
                            {userAddress && userAddress?.length > 0 ? (
                                userAddress?.map((address) => (
                                    <div key={address?._id} className="mb-3">
                                        <strong>Zip Code:</strong> {address?.zipCode} <br />
                                        <strong>Location:</strong> ({address?.latitude}, {address?.longitude})
                                    </div>
                                ))
                            ) : (
                                <div>No address information available.</div>
                            )}
                        </div>
                    </div>

                    {/* Documents Section */}
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <h5 className="mb-3 text-uppercase text-decoration-underline">Documents</h5>
                            <div className="row">
                                {additional ? (
                                    <>
                                        {additional?.driverLicenseImage && (
                                            <div className="col-md-2 mb-3">
                                                <strong>Driver License Image:</strong>
                                                <Link to={additional?.driverLicenseImage} target="_blank" rel="noopener noreferrer">
                                                    <img src={additional?.driverLicenseImage} alt="Driver License" className="img-fluid mt-1" />
                                                </Link>
                                            </div>
                                        )}
                                        {additional?.companyLicenseImage && (
                                            <div className="col-md-2 mb-3">
                                                <strong>Company License Image:</strong>
                                                <Link to={additional?.companyLicenseImage} target="_blank" rel="noopener noreferrer">
                                                    <img src={additional?.companyLicenseImage} alt="Company License" className="img-fluid mt-1" />
                                                </Link>
                                            </div>
                                        )}
                                        {additional?.businessLicenseImage && (
                                            <div className="col-md-2 mb-3">
                                                <strong>Business License Image:</strong>
                                                <Link to={additional?.businessLicenseImage} target="_blank" rel="noopener noreferrer">
                                                    <img src={additional?.businessLicenseImage} alt="Business License" className="img-fluid mt-1" />
                                                </Link>
                                            </div>
                                        )}
                                        {additional?.licenseProofImage && (
                                            <div className="col-md-2 mb-3">
                                                <strong>License Proof Image:</strong>
                                                <Link to={additional?.licenseProofImage} target="_blank" rel="noopener noreferrer">
                                                    <img src={additional?.licenseProofImage} alt="License Proof" className="img-fluid mt-1" />
                                                </Link>
                                            </div>
                                        )}
                                        {additional?.businessImage && (
                                            <div className="col-md-2 mb-3">
                                                <strong>Business Image:</strong>
                                                <Link to={additional?.businessImage} target="_blank" rel="noopener noreferrer">
                                                    <img src={additional?.businessImage} alt="Business" className="img-fluid mt-1" />
                                                </Link>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div>No document information available.</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Verify Button */}
                    <div className="mt-4 text-center">
                        <button
                            className={isVerified ? "btn btn-danger" : "btn btn-success"}
                            onClick={handleVerifyClick}
                        >
                            {!isVerified ? "Verify Service Provider" : "Unverify Service Provider"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceProviderDetails;