// AutoLogout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoLogout = ({ timeoutMinutes = 60 }) => {
  const navigate = useNavigate();
  let inactivityTimer;

  const logout = () => {
    // Clear tokens and user data
    localStorage.removeItem('token');

    // Add any other cleanup as needed
    
    // Redirect to login
    navigate('/auth/login');
  };

  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, timeoutMinutes * 60 * 1000);
  };

  useEffect(() => {
    // Set up event listeners
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      resetTimer();
    };

    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Initialize timer
    resetTimer();

    // Cleanup
    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AutoLogout;