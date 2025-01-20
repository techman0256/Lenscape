import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Signin.css';  // Import the custom CSS for Signup

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:4000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({user: { username: username, email: email, password: password }}),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Signup successful:');
        // New User is successfully signed up now create a new user profile
        // redirect to profile/ route
        navigate('/profile/' + result.user.username);

        
      } else {
        setError(result.message);
      }
      // create another fetch request to create a new user profile
      try {
        const response = await fetch(`http://127.0.0.1:4000/account/${result.user.username}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            username: result.user.username, 
            title: "Dummy Title", 
            bio: "Add your bio here",
            profileImage: "https://img.freepik.com/premium-photo/elevate-your-brand-with-friendly-avatar-that-reflects-professionalism-ideal-sales-managers_1283595-18531.jpg?w=740",
          }),
        })
        if (response.ok) {
          console.log('Profile saved:', response);
        } else {
          const result = await response.json();
          setError(result.status);
        }
      } catch {
        console.error('Profile save error:', error);
        setError('Something went wrong. Please try again.');
      }
  
    } catch (error) {
      console.error('Signup error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <img src="lenscape_logo.jpg" alt="Lenscape Logo" className="logo" />
      {/* <h2 className="signup-title">Sign Up</h2> */}
      <form className="signup-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username" className="label"></label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your username"
            className="input-field"
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label"></label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
            className="input-field"
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label"></label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
            className="input-field"
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="label"></label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm your password"
            className="input-field"
            required 
          />
        </div>
        <button type="submit" className="btn-submit">Sign Up</button>
      </form>
      <p className="signin-prompt">
        Already have an account? <Link to="/signin" className="signin-link">Sign In</Link>
      </p>
    </div>
  );
};

export default Signup;
