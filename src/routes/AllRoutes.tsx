import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/others/Dashboard';

const AllRoutes = (): JSX.Element => {
    return (
        <>
            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </>
    );
};

export default AllRoutes;