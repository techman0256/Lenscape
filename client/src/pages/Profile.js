import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';

import ImageUpload from '../components/Upload/ImageUpload'; // Assuming this is the component for uploading images
import './Profile.css';

const Profile = (isAuthenticated) => {
  const { username } = useParams();

  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [error, setError] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Fetch profile data when the component is mounted
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/account/${username}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();
          const profile = {
            username: result.profile.username,
            title: result.profile.title,
            profileImage: result.profile.profileImage,
            bio: result.profile.bio
          }
          console.log(profile);
          
          setProfile(profile);
          setOriginalProfile(profile);
        } else {
          const result = await response.json();
          setError(result.message || 'Profile not found');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Something went wrong. Please try again later.');
      }
    };

    fetchProfile();
  }, [username]);

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const saveProfile = async () => {
    try {
      console.log("This profile is going to be uploaded", profile);
      
      const response = await fetch(`http://127.0.0.1:4000/account/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ profile }),
      });

      if (response.ok) {
        console.log('Profile updated:', response);
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to save profile.');
      }
    } catch (error) {
      console.error('Profile save error:', error);
      setError('Something went wrong. Please try again later.');
    }

    setOriginalProfile({ ...profile });
    setIsEditMode(false);
  };

  const cancelEdit = () => {
    setProfile({ ...originalProfile });
    setIsEditMode(false);
  };

  const handleProfileImageChange = (newPhotoUrl) => {
    console.log(newPhotoUrl);
    
    setProfile({ ...profile, profileImage: newPhotoUrl });
    setIsUploadModalOpen(false);
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl text-red-500 font-bold">{error}</h1>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Loading Profile...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-8 lg:p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {isEditMode ? 'Edit Profile' : 'Profile'}
        </h1>
        <div className="flex space-x-2">
          {isEditMode && (
            <button
              onClick={cancelEdit}
              className="p-2 rounded text-white bg-red-500 hover:bg-red-600"
              title="Cancel Editing"
            >
              <FaTimes size={24} />
            </button>
          )}
          <button
            onClick={() => (isEditMode ? saveProfile() : setIsEditMode(true))}
            className="p-2 rounded text-white hover:opacity-90"
            title={isEditMode ? 'Save Profile' : 'Edit Profile'}
          >
            {isEditMode ? (
              <FaSave className="text-green-500" size={24} />
            ) : (
              <FaEdit className="text-blue-500" size={24} />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 mt-6">
        <div className="relative">
          <img
            src={profile.profileImage}
            alt="Profile Avatar"
            className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-lg"
          />
          {isEditMode && (
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full"
              title="Change Profile Photo"
            >
              <FaCamera size={16} />
            </button>
          )}
        </div>
        <div>
          {isEditMode ? (
            <input
              type="text"
              value={profile.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="border border-gray-300 p-2 rounded-md text-xl font-bold text-gray-800"
            />
          ) : (
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {profile.username}
            </h1>
          )}
          {isEditMode ? (
            <input
              type="text"
              value={profile.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="border border-gray-300 p-2 rounded-md text-lg text-gray-600 mt-2"
            />
          ) : (
            <p className="text-lg text-gray-600">@{profile.title}</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">About Me</h2>
        {isEditMode ? (
          <textarea
            value={profile.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full mt-2"
          />
        ) : (
          <p className="mt-2 text-gray-700">{profile.bio}</p>
        )}
      </div>

      {isUploadModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg relative">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full"
              title="Close"
            >
              <FaTimes size={16} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Upload Profile Photo</h2>
            <ImageUpload
              onUpload={(url) => handleProfileImageChange(url)}
              onClose={() => setIsUploadModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
