// src/pages/ProfileLayout.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfileLayout({ theme }) {
    const navigate = useNavigate();

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
