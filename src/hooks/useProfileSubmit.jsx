// hooks/useFilteredCards.js
import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useProfileSubmit = (addProfile) => {
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();

  const handleAddProfile = (newProfile) => {
    addProfile(newProfile);
    setSubmitMessage('Profile created successfully!');

    // Clear message after 3 seconds
    setTimeout(() => setSubmitMessage(''), 3000);
    navigate('/'); // Redirect to home page after submission
  };

  return {
    submitMessage,
    handleAddProfile,
  };
};