// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage({ theme }) {
  const { id } = useParams();
  const currentId = parseInt(id);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${currentId}`
        );
        const data = await response.json();

        if (data.error) {
          setError(data.error);
          setProfile(null);
        } else {
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentId]);

  if (loading) return <p className={theme}>Loading profile...</p>;
  if (error) return <p className={theme}>Error: {error}</p>;
  if (!profile) return <p className={theme}>Profile not found.</p>;

  return (
    <div className={`profile-page ${theme}`}>
      <img src={profile.image_url} alt={profile.name} />
      <h1>{profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Title: {profile.title}</p>
      <p>Bio: {profile.bio}</p>
    </div>
  );
}

export default ProfilePage;
