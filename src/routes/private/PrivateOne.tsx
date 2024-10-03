import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateOne = (): JSX.Element => {
    const accessToken: string | null = window.localStorage.getItem("accessToken");
    const refreshToken: string | null = window.localStorage.getItem("refreshToken");
    const location = useLocation();

    return (
        <>
            {(accessToken || refreshToken) ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}
        </>
    )
};

export default PrivateOne;