import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import PageTitle from "../../PageTitle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceRequest } from "../../../store/reducers/ServiceReducers";
import { ServiceRequest } from "../../../../types/services";
import { getShiftRequest } from "../../../store/reducers/ShiftReducers";
import { formatReadableDateTime } from "../../../utils/utility";


const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Service Request List", link: "/service-request-list" },
    { label: "Service Request Details" },
];

const ServiceRequestDetails = (): JSX.Element => {
    const { service_requestId } = useParams();
    const { singleServiceData } = useSelector((state: RootState) => state.serviceSlice);
    const { singleShiftData } = useSelector((state: RootState) => state.shiftSlice);
    const dispatch: AppDispatch = useDispatch();

    const [serviceDetails, setServiceDetails] = useState<ServiceRequest | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>("");

    useEffect(() => {
        dispatch(getServiceRequest({ serviceId: service_requestId }));
    }, [dispatch, service_requestId]);

    useEffect(() => {
        setServiceDetails(singleServiceData as ServiceRequest);
    }, [singleServiceData]);

    useEffect(() => {
        const shiftId = serviceDetails?.serviceShifftId?._id;
        if (shiftId) {
            dispatch(getShiftRequest({ shiftId }));
        }
    }, [dispatch, serviceDetails]);

    if (!serviceDetails || !serviceDetails.userId) {
        return (
            <>
                <PageTitle pageName="Service Request Details" breadcrumbs={breadcrumbs} />

                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <h4 className="text-center">No Data Found</h4>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const {
        firstName,
        lastName,
        email,
        phone,
        avatar
    } = serviceDetails?.userId;

    const {
        SelectedShiftTime,
        categoryId,
        serviceStartDate,
        serviceZipCode,
        serviceLatitude,
        serviceLongitude,
        isIncentiveGiven,
        incentiveAmount,
        isApproved,
        isReqAcceptedByServiceProvider,
        serviceProviderId,
        answerArray,
        createdAt,
        updatedAt,
        requestProgress,
        serviceProductImage,
        otherInfo,
    } = serviceDetails;

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const selectedShiftTime = singleShiftData?.shiftTimes?.find(
        (shiftTime) => shiftTime?._id === SelectedShiftTime?.shiftTimeId
    );

    return (
        <>
            <PageTitle pageName="Service Request Details" breadcrumbs={breadcrumbs} />

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <div>
                                <h4 className="text-uppercase text-decoration-underline">Service Request For</h4>
                                <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                    <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Category:</strong> {categoryId?.name}
                                </div>
                                {answerArray.length > 0 ? (
                                    <ul>
                                        {answerArray.map((answer, index) => (
                                            <li key={index}>{answer.answer}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div>No service details available</div>
                                )}
                            </div>

                            <div className="mt-5">
                                <h4 className="mb-3 text-uppercase text-decoration-underline">Request Information</h4>
                                <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                    <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Request Progress:</strong> {requestProgress}
                                </div>
                                <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                    <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Created At:</strong> {formatReadableDateTime(createdAt)}
                                </div>
                                <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                    <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Updated At:</strong> {formatReadableDateTime(updatedAt)}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <h4 className="mb-3 text-uppercase text-decoration-underline">Service Request Details</h4>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Service Start Date:</strong> {formatReadableDateTime(serviceStartDate)}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Booked Service Shift:</strong> {singleShiftData?.shiftName?.toUpperCase()}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Booked Time Slot:</strong> {`${selectedShiftTime?.startTime} - ${selectedShiftTime?.endTime}`}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Service Zip Code:</strong> {serviceZipCode}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Latitude:</strong> {serviceLatitude}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Longitude:</strong> {serviceLongitude}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Incentive Given:</strong> {isIncentiveGiven ? 'Yes' : 'No'}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Incentive Amount:</strong> {incentiveAmount ? incentiveAmount : "-- --"}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Approval Status:</strong> {isApproved}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Request Accepted By Service Provider:</strong> {isReqAcceptedByServiceProvider ? 'Yes' : 'No'}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Assigned Service Provider:</strong> {serviceProviderId ? `${serviceProviderId?.firstName} ${serviceProviderId?.lastName}` : 'Not Assigned'}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <h4 className="mb-3 text-uppercase text-decoration-underline">Customer Information</h4>
                            <div className="mb-2">
                                <img
                                    src={avatar ? avatar : "https://placehold.co/50x50"}
                                    alt=""
                                    className="img-fluid mt-1"
                                    style={{
                                        height: "80px",
                                        width: "80px",
                                        borderRadius: "50%",
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Name:</strong> {firstName} {lastName}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Email:</strong> {email}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Phone:</strong> {phone ? phone : "-- --"}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {otherInfo && (
                                <>
                                    <h4 className="mt-4 text-uppercase text-decoration-underline">Other Info</h4>
                                    <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                        <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Product Serial Number:</strong> {otherInfo?.productSerialNumber ? otherInfo?.productSerialNumber : "-- --"}
                                    </div>
                                    <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                        <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Service Description:</strong> {otherInfo?.serviceDescription ? otherInfo?.serviceDescription : "-- --"}
                                    </div>
                                </>
                            )}
                            {/* Image in a div */}
                            <div className="cursor-pointer"
                                onClick={() => handleImageClick(serviceProductImage || "https://placehold.co/150x150")}
                            >
                                <img
                                    src={serviceProductImage ? serviceProductImage : "https://placehold.co/150x150"}
                                    alt=""
                                    className="img-fluid mt-1 img-thumbnail"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for displaying large image */}
            {isModalOpen && (
                <div
                    className="modal"
                    onClick={handleCloseModal}
                    style={{
                        display: 'block',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 9999,
                        overflow: 'auto',
                    }}
                >
                    <div
                        className="modal-content"
                        style={{
                            margin: '10% auto',
                            padding: '10px',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            width: '500px',
                            height: '500px',
                            position: 'relative',
                        }}
                    >
                        <span
                            className="modal-close"
                            onClick={handleCloseModal}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: '15px',
                                fontSize: '30px',
                                cursor: 'pointer',
                            }}
                        >
                            &times;
                        </span>
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="img-modal"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: '5px',
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ServiceRequestDetails;