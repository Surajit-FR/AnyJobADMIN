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
import IpDetails from '../pages/others/IPDetails';
import TransactionsList from '../pages/others/AllTransactions';


const AllRoutes = (): JSX.Element => {

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
                <Route path='/system-ip-logs-details' element={<IpDetails />} />
                <Route path='/transactions' element={<TransactionsList />} />
            </Routes>
        </>
    );
};

export default AllRoutes;