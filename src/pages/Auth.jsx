import { useNavigate } from "react-router-dom";

const Auth = ({component}) => {
    const navigate = useNavigate();

    return (
        <>
            {component}
        </>
    )
};

export default Auth;