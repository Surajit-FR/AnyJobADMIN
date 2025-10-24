import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import PageTitle from "../../PageTitle";
import { useEffect, useState } from "react";
import { getUserDetailsRequest, verifyServiceProviderUserDetailsRequest } from "../../../store/reducers/UserReducers";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../../ConfirmationModal";
import ImagePreviewModal from "./ImagePreviewModal";
import { REMOVEUSER } from "../../../store/api/Api";
import { showToast } from "../../../utils/Toast";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Service Provider List", link: "/service-provider-list" },
    { label: "Service Provider Details" },
];

const ServiceProviderDetails = (): JSX.Element => {
    const { service_providerId } = useParams();
     const navigate = useNavigate();
    const { userData } = useSelector((state: RootState) => state.userSlice);
    const dispatch: AppDispatch = useDispatch();

    const { firstName, lastName, email, phone, isVerified, additionalInfo, userAddress } = userData || {};
    const additional = additionalInfo?.[0];

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleVerifyClick = () => {
        dispatch(verifyServiceProviderUserDetailsRequest({ userId: service_providerId, isVerified: !isVerified }));
    };

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const handleModalClose = () => {
        setSelectedImage(null);
    };
       const handleDeleteUser = async () => {    
        if (service_providerId) {
            try {
                const resp = await REMOVEUSER(service_providerId);

                if (resp?.data?.success) {
                    console.log({ resp: resp?.data });
                    showToast({ message: resp?.data?.message, type: 'success', durationTime: 3500, position: "top-center" });
                    navigate("/service-provider-list");
                }
            } catch (error) {
                console.error(`Error while trying to delete user:`, error);
            }
        }
    };

    useEffect(() => {
        dispatch(getUserDetailsRequest({ userId: service_providerId }));
    }, [dispatch, service_providerId]);

    return (
        <>
            <PageTitle pageName="Service Provider Details" breadcrumbs={breadcrumbs} />

            <ConfirmationModal
                modalId="verify-alert-modal"
                modalText={`Want To ${!isVerified ? "Verify This Service Provider" : "Unverify This Service Provider"}?`}
                onDelete={handleVerifyClick}
            />

            <ConfirmationModal
                modalId="remove-user-modal"
                modalText={`Want To ${"Remove This Service Provider"}?`}
                onDelete={handleDeleteUser}
            />

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        {/* Personal Information */}
                        <div className="col-md-4">
                            <h5 className="mb-3 text-uppercase text-decoration-underline">Personal Information</h5>
                            <div>
                                <strong>Name:</strong> {firstName} {lastName} {isVerified ? <span className="text-success">(Verified)</span> : <span className="text-danger">(Unverified)</span>}
                            </div>
                            <div><strong>DOB:</strong> {new Date(userData?.dob ?? "").toLocaleDateString()}</div>
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
                                        <strong>Address:</strong> {address?.location} <br />
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
                                        {additional?.driverLicenseImages?.map((imageUrl: string, index: number) => (
                                            <div className="col-md-2 mb-3" key={`driver-${index}`}>
                                                <strong>Driver License Image({index + 1}):</strong>
                                                <img
                                                    src={imageUrl}
                                                    alt={`Driver License ${index + 1}`}
                                                    className="img-fluid mt-1"
                                                    onClick={() => handleImageClick(imageUrl)}
                                                    style={{ cursor: "pointer", height: "280px", objectFit: 'cover' }}
                                                />
                                            </div>
                                        ))}

                                        {additional?.companyLicenseImage && (
                                            <div className="col-md-2 mb-3">
                                                <strong>Company License Image:</strong>
                                                <img
                                                    src={additional?.companyLicenseImage}
                                                    alt="Company License"
                                                    className="img-fluid mt-1"
                                                    onClick={() => handleImageClick(additional?.companyLicenseImage)}
                                                    style={{ cursor: "pointer", height: "280px", objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}

                                        {additional?.businessLicenseImage && (
                                            <div className="col-md-2 mb-3">
                                                <strong>Business License Image:</strong>
                                                <img
                                                    src={additional?.businessLicenseImage}
                                                    alt="Business License"
                                                    className="img-fluid mt-1"
                                                    onClick={() => handleImageClick(additional?.businessLicenseImage)}
                                                    style={{ cursor: "pointer", height: "280px", objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}

                                        {additional?.licenseProofImage && (
                                            <div className="col-md-2 mb-3">
                                                <strong>License Proof Image:</strong>
                                                <img
                                                    src={additional?.licenseProofImage}
                                                    alt="License Proof"
                                                    className="img-fluid mt-1"
                                                    onClick={() => handleImageClick(additional?.licenseProofImage)}
                                                    style={{ cursor: "pointer", height: "280px", objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}

                                        {additional?.businessImage && (
                                            <div className="col-md-2 mb-3">
                                                <p className="fw-bold p-0 m-0">Company Logo:</p>
                                                <img
                                                    src={additional?.businessImage}
                                                    alt="Company Logo"
                                                    className="img-fluid mt-1"
                                                    onClick={() => handleImageClick(additional?.businessImage)}
                                                    style={{ cursor: "pointer", height: "280px", objectFit: 'cover' }}
                                                />
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
                            data-bs-toggle="modal"
                            data-bs-target="#verify-alert-modal"
                            className={isVerified ? "btn btn-danger" : "btn btn-success"}
                        >
                            {!isVerified ? "Verify Service Provider" : "Unverify Service Provider"}
                        </button>
                    </div>
                        {/* Remove Button */}
                    <div className="mt-4 text-center">
                        <button
                            data-bs-toggle="modal"
                            data-bs-target="#remove-user-modal"
                            className={ "btn btn-danger"}
                        >
                            {"Remove Service Provider"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (<ImagePreviewModal imageUrl={selectedImage} onClose={handleModalClose} />)}
        </>
    );
};

export default ServiceProviderDetails;