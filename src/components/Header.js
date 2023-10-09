import React from 'react';
import { useStore } from "../hooks/useStore";
import { googleLogout } from "@react-oauth/google";
import "./Header.css"; // Import your CSS file

const Header = () => {
    const { authData, setAuthData } = useStore();

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem("AuthData");
        setAuthData(null);
        window.location.reload();
    }

    return (
        <>
            <div className="d-flex p-2 bd-highlight justify-content-between admin-header">
                <div className="h2 bd-highlight mt-3">Weather bot</div>
                <div className="p-2 bd-highlight">
                    {authData && (<>
                        <img src={authData.data.image} alt="profile" className="rounded-circle profile-image mr-2" />
                        <span className="mr-2">{authData.data.name}</span>
                        <button onClick={handleLogout} className="btn btn-dark logout-btn">Logout</button>
                    </>)}</div>
            </div>
        </>
    );
}

export default Header;
