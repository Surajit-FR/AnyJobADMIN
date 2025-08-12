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
    // const { singleShiftData } = useSelector((state: RootState) => state.shiftSlice);
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

    if (!serviceDetails || !serviceDetails.customerName) {
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
        // SelectedShiftTime,
        serviceStartDate,
        isIncentiveGiven,
        incentiveAmount,
        answerArray,
        createdAt,
        updatedAt,
        requestProgress,
        serviceProductImage,
        customerName,
        customerEmail,
        serviceProviderName,
        serviceProviderPhone,
        customerPhone,
        categoryName,
        customerAvatar,
        serviceDescription,
        bookedTimeSlot,
        bookedServiceShift,
        serviceProductSerialNumber,
        assignedAgentEmail,
        assignedAgentName,
        assignedAgentPhone,
        isReqAcceptedByServiceProvider,
        totalCustomerRatings,
        serviceStartReadableFormat,
        serviceEndReadableFormat
    } = serviceDetails;


    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // const selectedShiftTime = singleShiftData?.shiftTimes?.find(
    //     (shiftTime) => shiftTime?._id === SelectedShiftTime?.shiftTimeId
    // );


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
                                    <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Category:</strong> {categoryName}
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
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Service Start Date:</strong> {new Date(serviceStartDate).toLocaleDateString()}
                                {/* {formatReadableDateTime(serviceStartDate)} */}
                            </div>
                            {/* shift details */}
                            {serviceStartReadableFormat && bookedTimeSlot  && (
                                <>
                                    <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                        <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Booked Service Shift:</strong> {bookedServiceShift && bookedServiceShift.toUpperCase()}
                                    </div>
                                    <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                        <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Booked Time Slot:</strong> {`${bookedTimeSlot[0].startTime} - ${bookedTimeSlot[0].endTime}`}
                                    </div>
                                </>
                            )}
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Incentive Given:</strong> {isIncentiveGiven ? 'Yes' : 'No'}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Incentive Amount:</strong> {incentiveAmount ? incentiveAmount : "-- --"}
                            </div>
                            {/*request progress pending*/}
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Request Accepted By Service Provider:</strong> {!isReqAcceptedByServiceProvider ? 'No' : 'Yes'}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Assigned Service Provider:</strong> {serviceProviderName ? serviceProviderName : 'Not Assigned'}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Service Provider Phone:</strong> {serviceProviderPhone ? serviceProviderPhone : '-- --'}
                            </div>
                            {/* field  agent details */}
                            {
                                assignedAgentName && (
                                    <>
                                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Assigned Field Agent Name:</strong> {assignedAgentName}
                                        </div>
                                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Assigned Field Agent Email:</strong> {assignedAgentEmail}
                                        </div>
                                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Assigned Field Agent Phone:</strong> {assignedAgentPhone}
                                        </div>
                                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Total Customer Ratings:</strong> {totalCustomerRatings}
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        <div className="col-md-4">
                            <h4 className="mb-3 text-uppercase text-decoration-underline">Customer Information</h4>
                            <div className="mb-2">
                                <img
                                    src={customerAvatar ? customerAvatar : "https://placehold.co/50x50"}
                                    alt=""
                                    className="img-fluid"
                                    style={{
                                        height: "80px",
                                        width: "80px",
                                        borderRadius: "50%",
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Name:</strong> {customerName}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Email:</strong> {customerEmail}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Phone:</strong> {customerPhone ? customerPhone : "-- --"}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="mt-4 text-uppercase text-decoration-underline">Other Info</h4>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Product Serial Number:</strong> {serviceProductSerialNumber ? serviceProductSerialNumber : "-- --"}
                            </div>
                            <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                                <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Service Description:</strong> {serviceDescription ? serviceDescription : "-- --"}
                            </div>
                            <div className="cursor-pointer"
                                onClick={() => handleImageClick(serviceProductImage || "https://placehold.co/150x150")}
                            >
                                <img
                                    src={serviceProductImage ? serviceProductImage : "https://placehold.co/150x150"}
                                    alt=""
                                    className="img-fluid mt-1 img-thumbnail"
                                    style={{
                                        height: "150px",
                                        width: "150px",
                                    }}
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