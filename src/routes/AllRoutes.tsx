import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/others/Dashboard';
import Profile from '../pages/others/Profile';
import SaleSheet from '../pages/others/SaleSheet';
import RegisteredCustomerList from '../pages/others/RegisteredCustomerList';
import ServiceRequestList from '../pages/others/ServiceRequestList';
import ServiceProviderList from '../pages/others/ServiceProviderList';
import ManageRole from '../pages/others/ManageRole';
import ManageUser from '../pages/others/ManageUser';
import CategoryPage from '../pages/others/CategoryPage';
import ServiceQuestionPage from '../pages/others/ServiceQuestionPage';
import ManageQueue from '../pages/others/ManageQueue';
import IPAddressLog from '../pages/others/IPAddressLog';
import AllQuestions from '../pages/others/AllQuestions';
import ManageShiftPage from '../pages/others/ManageShiftPage';
import ServiceProviderDetails from '../components/core/serviceproviderlist/ServiceProviderDetails';
import ServiceRequestDetails from '../components/core/servicerequestlist/ServiceRequestDetails';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch,RootState} from "../store/Store";
import { useEffect, useState } from 'react';
import { getIncomingUserIprequest } from '../store/reducers/IpReducers';


const AllRoutes = (): JSX.Element => {
const dispatch: AppDispatch = useDispatch()
const {userIpInfo} = useSelector((state: RootState)=> state.ipSlice)
const role = localStorage.getItem("role")
const ipDetails = sessionStorage.getItem("ipDetails")
const [ip, setIP] = useState("")
    const getIpData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        // const res2 = await axios.get("https://ipapi.co/json");
        // console.log(res.data);
        setIP(res.data.ip);
        // console.log({res2})
    };
    useEffect(()=>{
        if(!ipDetails){
            dispatch(getIncomingUserIprequest("IpSlice/getIncomingUserIprequest"))
            getIpData()
        }

    },[dispatch, ipDetails])
//     useEffect(()=>{
//         getIp()
//     },[])
    useEffect(()=>{
        getIpData()
    },[])

    useEffect(()=>{
        if(ip && role && userIpInfo?.ip){
            sessionStorage.setItem("ipDetails",JSON.stringify({...userIpInfo,ip,route:window.location.href,userType:role}))
        }
    },[userIpInfo,ip,role])
    console.log({userIpInfo})
    return (
        <>
            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/manage-role' element={<ManageRole />} />
                <Route path='/manage-user' element={<ManageUser />} />
                <Route path='/registered-customer-list' element={<RegisteredCustomerList />} />
                <Route path='/service-provider-list' element={<ServiceProviderList />} />
                <Route path='/service-provider-details/:service_providerId' element={<ServiceProviderDetails />} />
                <Route path='/service-request-list' element={<ServiceRequestList />} />
                <Route path='/service-request-details/:service_requestId' element={<ServiceRequestDetails />} />
                <Route path='/manage-service-category' element={<CategoryPage />} />
                <Route path='/manage-service-questions' element={<ServiceQuestionPage />} />
                <Route path='/all-service-questions' element={<AllQuestions />} />
                <Route path='/manage-service-shift' element={<ManageShiftPage />} />
                <Route path='/manage-service-request-queue' element={<ManageQueue />} />
                <Route path='/sale-sheet' element={<SaleSheet />} />
                <Route path='/system-ip-logs' element={<IPAddressLog />} />
            </Routes>
        </>
    );
};

export default AllRoutes;