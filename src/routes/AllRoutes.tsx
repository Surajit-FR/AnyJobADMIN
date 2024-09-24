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
import SubCategoryPage from '../pages/others/SubCategoryPage';
import ManageQue from '../pages/others/ManageQue';
import IPAddressLog from '../pages/others/IPAddressLog';

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
                <Route path='/service-request-list' element={<ServiceRequestList />} />
                <Route path='/service-category' element={<CategoryPage />} />
                <Route path='/service-sub-category' element={<SubCategoryPage />} />
                <Route path='/manage-service-request-que' element={<ManageQue />} />
                <Route path='/sale-sheet' element={<SaleSheet />} />
                <Route path='/system-ip-logs' element={<IPAddressLog />} />
            </Routes>
        </>
    );
};

export default AllRoutes;