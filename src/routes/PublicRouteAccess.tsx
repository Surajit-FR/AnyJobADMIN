import { Navigate, useLocation } from "react-router-dom";

const PublicRouteAccess = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const accessToken: string | null = window.localStorage.getItem("accessToken");
    const refreshToken: string | null = window.localStorage.getItem("refreshToken");
    const location = useLocation();

    if (accessToken || refreshToken) {
        return <Navigate to={location.state?.from?.pathname || "/dashboard"} state={{ from: location }} replace />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default PublicRouteAccess;