import GoogleMapReact from "google-map-react";
import { GOOGLE_API_KEY } from "../../config/app.config";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import PageTitle from "../../components/PageTitle";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { IPData } from "../../../types/ipstate";


const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "IP Details" }
];

interface Props {
    text: string
    lat: number
    lng: number
    name: string
}

const LocationPin = ({ text, name }: Props): JSX.Element => (
    <div className="pin">
        {/* <i className="ri-close-fill align-middle"></i> */}
        <Icon icon={locationIcon} className="pin-icon" style={{ height: "50px", width: "50px", marginBottom: "5px", color: 'rgba(219, 26, 26, 0.76)' }} />
        <div className="pin-text"
            style={{ minWidth: '200px', minHeight: '20px', backgroundColor: "rgb(47 74 76 / 57%)", fontSize: "large", fontWeight: "bold", borderRadius: "10px", padding: "1em", color: "white" }}
        >
            <h4>{name}</h4>


            {text}
        </div>
    </div>
);

const IpDetails = (): JSX.Element => {

    const nodeRef = useRef<GoogleMapReact| null>(null)

    const location = useLocation()
    const [userData, setUserData] = useState<IPData>()
    const userTypeParser = (value: string) => {
        if (value === "SuperAdmin") return "Super Admin"
        return value
    }

    useEffect(() => {
        if (location.state) {
            setUserData(JSON.parse(location.state))
        }
    }, [location.state])

    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="System IP Details" breadcrumbs={breadcrumbs} />
            <div className="card">
                <div className="card-body row">
                    <div className="col-md-3">
                        <h4 className="mb-3 text-uppercase text-decoration-underline">User Information</h4>
                        <div className="mb-2">
                            <img
                                src={(userData && userData.userId && userData.userId.length > 0 && userData.userId[0].avatar) ? userData.userId[0].avatar : "https://placehold.co/50x50"}
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
                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>User Name:</strong>
                            {(userData && userData.userId && userData.userId.length > 0) ? `${userData.userId[0].firstName} ${userData.userId[0].lastName}` : "-- --"}
                        </div>
                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>User Email:</strong>
                            {(userData && userData.userId && userData.userId.length > 0) ? `${userData.userId[0].email}` : "-- --"}
                        </div>
                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Phone:</strong>
                            {(userData && userData.userId && userData.userId.length > 0) ? `${userData.userId[0].phone}` : "-- --"}
                        </div>
                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>User type:</strong>
                            {(userData && userData.userId && userData.userId.length > 0) ? userTypeParser(userData.userId[0].userType) : "-- --"}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h4 className="mb-3 text-uppercase text-decoration-underline">IP Log Details</h4>
                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>User IP Address:</strong> {userData?.ipAddress || '-- --'}
                        </div>

                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>User Agent:</strong>
                            {userData?.userAgent || "-- --"}
                        </div>
                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Country:</strong>
                            {userData?.country || "-- --"}
                        </div>
                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Region:</strong>
                            {userData?.region || '-- --'}
                        </div>
                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Longitude:</strong>
                            {userData?.longitude || '-- --'}
                        </div>
                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>latitude:</strong>
                            {userData?.latitude || '-- --'}
                        </div>
                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>

                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Route Visited:</strong>
                            {userData?.route || '-- --'}

                        </div>
                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Date Visited:</strong>
                            {userData?.timestamp ? new Date(userData?.timestamp).toLocaleDateString() : '-- --'}
                        </div>
                        <div style={{ marginBottom: "0.55rem", fontSize: "15px" }}>
                            <strong style={{ fontWeight: "bold", fontSize: "16px", marginRight: "2px" }}>Time Visited:</strong>
                            {userData?.timestamp ? new Date(userData?.timestamp).toTimeString() : '-- --'}
                        </div>
                    </div>
                    <div
                        style={{ minHeight: "500px" }}
                        className="col-md-6" >
                        {userData && userData.latitude && userData.longitude ?
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: GOOGLE_API_KEY, libraries: ['places'], id: 'CUSTOM_SCRIPT_ID' }}
                                defaultCenter={{
                                    lat: Number(userData?.latitude),
                                    lng: Number(userData?.longitude)
                                }}
                                defaultZoom={13}
                                ref={nodeRef}
                            >
                                <LocationPin
                                    lat={Number(userData?.latitude)}
                                    lng={Number(userData?.longitude)}
                                    text={userData?.ipAddress || ''}
                                    name={(userData.userId && userData.userId.length > 0) ? `${userData.userId[0].firstName} ${userData.userId[0].lastName}` : ""}
                                />
                            </GoogleMapReact>
                            : <div>No Location Data Found</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default IpDetails;