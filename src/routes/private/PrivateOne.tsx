import axios from "axios";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getIncomingUserIprequest, exportIpDetailsRequest } from "../../store/reducers/IpReducers";
import { IP_CAPTURE_URL } from "../../config/app.config";


const PrivateOne = (): JSX.Element => {
    const accessToken: string | null = window.localStorage.getItem("accessToken");
    const refreshToken: string | null = window.localStorage.getItem("refreshToken");
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch()
    const { userIpInfo } = useSelector((state: RootState) => state.ipSlice)
    const role = localStorage.getItem("role")
    const id = localStorage.getItem("_id")
    const ipDetails = sessionStorage.getItem("ipDetails") || ''
    const [ip, setIP] = useState("")
    const getIpData = async () => {
        const res = await axios.get(IP_CAPTURE_URL);
        setIP(res.data.ip);
    };
    useEffect(() => {
        if (!ipDetails) {
            getIpData()
        }
    }, [ipDetails])
// console.log({ip})

    //     useEffect(()=>{
    //         getIp()
    //     },[])
    useEffect(() => {
        getIpData()
    }, [])
    useEffect(() => {
        if (ip && !ipDetails) {
            dispatch(getIncomingUserIprequest({ ipAddress: ip }))
        }
    }, [dispatch, ip, ipDetails])

    useEffect(() => {
        if (ip && role && userIpInfo?.ipAddress && id) {
            sessionStorage.setItem("ipDetails", JSON.stringify({
                ...userIpInfo,
                country: userIpInfo.country && userIpInfo.country.trim(),
                region: userIpInfo.region && userIpInfo.region.trim(),
                ipAddress: userIpInfo.ipAddress && userIpInfo.ipAddress.trim(),
                latitude:userIpInfo.latitude && Number(userIpInfo.latitude.trim()),
                longitude: userIpInfo.longitude && Number(userIpInfo.longitude.trim()),
                route: window.location.href,
                userId: id,
                userType: role
            }))
        }
    }, [userIpInfo, ip, role, id])
    useEffect(()=>{
        // if(window.location.origin !== "http://localhost:3000"){
            let parsedDetails = ipDetails && JSON.parse(ipDetails)
            if(parsedDetails && parsedDetails?.route !== window.location.href){
                parsedDetails = {...parsedDetails, route:window.location.href, userAgent: window.navigator.userAgent}
                sessionStorage.setItem("ipDetails", JSON.stringify(parsedDetails))
                dispatch(exportIpDetailsRequest(parsedDetails))
            // }
        }

    },[ipDetails,dispatch,location.pathname])

    return (
        <>
            {(accessToken || refreshToken) ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}
        </>
    )
};

export default PrivateOne;