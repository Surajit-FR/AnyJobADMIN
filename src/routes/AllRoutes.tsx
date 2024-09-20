import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/others/Dashboard';
import Profile from '../pages/others/Profile';
import SaleSheet from '../pages/others/SaleSheet';
import UserList from '../pages/others/UserList';
import JobList from '../pages/others/JobList';
import ServiceProviderList from '../pages/others/ServiceProviderList';
import ManageRole from '../pages/others/ManageRole';
import ManageUser from '../pages/others/ManageUser';
import CategoryPage from '../pages/others/CategoryPage';
import SubCategoryPage from '../pages/others/SubCategoryPage';

const AllRoutes = (): JSX.Element => {
    return (
        <>
            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/sale-sheet' element={<SaleSheet />} />
                <Route path='/user-list' element={<UserList />} />
                <Route path='/job-list' element={<JobList />} />
                <Route path='/service-provider-list' element={<ServiceProviderList />} />
                <Route path='/manage-role' element={<ManageRole />} />
                <Route path='/manage-user' element={<ManageUser />} />
                <Route path='/service-category' element={<CategoryPage />} />
                <Route path='/service-sub-category' element={<SubCategoryPage />} />
            </Routes>
        </>
    );
};

export default AllRoutes;