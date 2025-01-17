import { useState, useEffect } from 'react';

const useAuth = () => {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to verify token and fetch user data
  const verifyToken = async () => {
    console.log("verifying token is called......");
    
    const token = localStorage.getItem('token');
      
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:4000/auth', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data, "verifying token");
        
        setUsername(data.username);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return { username, isAuthenticated, loading, verifyToken };
};

export default useAuth;