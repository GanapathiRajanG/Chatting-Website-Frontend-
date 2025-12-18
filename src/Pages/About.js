import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/about.css';

const About = () => {
  const [profile, setProfile] = useState({ name: '', age: '', email: '', place: '', about: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!userData) {
      navigate('/login');
      return;
    }

    setProfile({
      name: userData.name || '',
      age: userData.age || '',
      email: userData.email || '',
      place: userData.place || '',
      about: userData.about || ''
    });
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();
    
    const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    // Update current user
    const updatedUser = { ...userData, ...profile };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === userData.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="about-container">
      <h2>Edit Profile</h2>
      <form className="about-form" onSubmit={handleSave}>
        <label>Name</label>
        <input 
          value={profile.name} 
          onChange={(e) => handleChange('name', e.target.value)} 
          required
        />

        <label>Age</label>
        <input 
          type="number" 
          value={profile.age} 
          onChange={(e) => handleChange('age', e.target.value)} 
        />

        <label>Email</label>
        <input 
          type="email" 
          value={profile.email} 
          onChange={(e) => handleChange('email', e.target.value)} 
          readOnly
          style={{backgroundColor: '#f5f5f5'}}
        />

        <label>Place</label>
        <input 
          value={profile.place} 
          onChange={(e) => handleChange('place', e.target.value)} 
        />

        <label>About / Description</label>
        <textarea 
          rows="4" 
          value={profile.about} 
          onChange={(e) => handleChange('about', e.target.value)} 
        />

        <div className="buttons">
          <button type="submit" className="save">Save</button>
        </div>
      </form>

      {message && <p className="msg">{message}</p>}
    </div>
  );
};

export default About;