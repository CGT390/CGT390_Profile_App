// src/pages/ProfileLayout.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useContext} from 'react';
import './ProfilePage.css';
import { AppContext } from '../AppContext'


function ProfileLayout() {
    const navigate = useNavigate();
    const { theme } = useContext(AppContext);


    return (
        <div className={`profile-layout ${theme}`}>
            {/* Shared UI */}
            <button className="go-back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>

            {/* Nested profile page renders here */}
            <Outlet />
        </div>
    );
}

export default ProfileLayout;
