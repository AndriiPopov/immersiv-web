import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "context/UserContext";

const useLoginCheck = () => {
    const navigate = useNavigate();
    const { isLoggedIn, authData, logout, isInitiated } = useUser();
    useEffect(() => {
        if (isInitiated) {
            if (!isLoggedIn) {
                logout();
                navigate("/login");
                return null;
            }

            if (!authData?.super) {
                if (authData?.projectId) {
                    navigate(`/p-admin/${authData.projectId}`);
                    return null;
                } else {
                    logout();
                    navigate("/login");
                    return null;
                }
            }
        }
    }, [isLoggedIn, authData?.super, authData?.projectId, isInitiated]);
};

export default useLoginCheck;
