import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";

const CustomerDetailsModal = (): JSX.Element => {
    const { userData } = useSelector((state: RootState) => state.userSlice);
    const { firstName, lastName, email, phone, additionalInfo, userAddress } = userData || {};
    const additional = additionalInfo?.[0];

    return (
        <>
            <div className="modal fade" id="customerdetailsmodal" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content p-2">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myCustomerdetailsmodalLabel">Customer Details</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Personal Information</h5>
                            <div className="mb-3">
                                <strong>Name:</strong> {firstName} {lastName}
                            </div>
                            <div className="mb-3">
                                <strong>Email:</strong> {email}
                            </div>
                            <div className="mb-3">
                                <strong>Phone:</strong> {phone}
                            </div>

                            <h5>Company Information</h5>
                            {additional ? (
                                <>
                                    <div className="mb-3">
                                        <strong>Company Name:</strong> {additional.companyName}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Introduction:</strong> {additional.companyIntroduction}
                                    </div>
                                    <div className="mb-3">
                                        <strong>DOB:</strong> {new Date(additional.DOB).toLocaleDateString()}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Driver License:</strong> {additional.driverLicense}
                                    </div>
                                    <div className="mb-3">
                                        <strong>EIN:</strong> {additional.EIN}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Company License:</strong> {additional.companyLicense}
                                    </div>
                                    {additional.driverLicenseImage && (
                                        <div className="mb-3">
                                            <strong>Driver License Image:</strong>
                                            <img src={additional.driverLicenseImage} alt="Driver License" className="img-fluid" />
                                        </div>
                                    )}
                                    {additional.companyLicenseImage && (
                                        <div className="mb-3">
                                            <strong>Company License Image:</strong>
                                            <img src={additional.companyLicenseImage} alt="Company License" className="img-fluid" />
                                        </div>
                                    )}
                                    {additional.businessImage && (
                                        <div className="mb-3">
                                            <strong>Business Image:</strong>
                                            <img src={additional.businessImage} alt="Business" className="img-fluid" />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div>No additional information available.</div>
                            )}

                            <h5>Address Information</h5>
                            {userAddress && userAddress.length > 0 ? (
                                userAddress.map((address) => (
                                    <div key={address._id} className="mb-3">
                                        <strong>Zip Code:</strong> {address.zipCode} <br />
                                        <strong>Location:</strong> ({address.latitude}, {address.longitude})
                                    </div>
                                ))
                            ) : (
                                <div>No address information available.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerDetailsModal;