import React, { useState } from 'react';
import Form from '../components/FOrm';
import './ContactPage.css';

const ContactPage = ({ theme, addProfile }) => {
  const [submitMessage, setSubmitMessage] = useState('');

  const handleAddProfile = (newProfile) => {
    addProfile(newProfile);
    setSubmitMessage('Profile created successfully!');
    
    // Clear message after 3 seconds
    setTimeout(() => setSubmitMessage(''), 3000);
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