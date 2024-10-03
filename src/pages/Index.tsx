import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Index = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        navigate('/dashboard')
    }, [navigate]);

    return (<></>)
};

export default Index;