import React, { useState, useContext  } from 'react';
import Form from '../components/FOrm';
import './ContactPage.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext'

const ContactPage = () => {
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();
  const { theme, addProfile } = useContext(AppContext);


  const handleAddProfile = (newProfile) => {
    addProfile(newProfile);
    setSubmitMessage('Profile created successfully!');

    // Clear message after 3 seconds
    setTimeout(() => setSubmitMessage(''), 3000);
    navigate('/'); // Redirect to home page after submission
  };

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