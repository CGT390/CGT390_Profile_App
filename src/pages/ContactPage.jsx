import React, { useState, useContext  } from 'react';
import Form from '../components/FOrm';
import './ContactPage.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { useProfileSubmit } from '../hooks/useProfileSubmit';

const ContactPage = () => {
  const navigate = useNavigate();
  const { theme, addProfile } = useContext(AppContext);


  const {
    submitMessage,
    handleAddProfile,
  } = useProfileSubmit(addProfile);

  return (
    <div className="form-page">
      <h1>Create a New Profile</h1>

      {submitMessage && (
        <div className="submit-message success">
          {submitMessage}
        </div>
      )}

      <Form mode={theme} onUpdateProfiles={handleAddProfile} />
    </div>
  );
};

export default ContactPage;