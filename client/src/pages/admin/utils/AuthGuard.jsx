// src/utils/AuthGuard.js
import { useEffect } from 'react';
import {
  useNavigate,
} from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const AuthGuard = ({ children }) => {
  const history = useNavigate();
  const token = localStorage.getItem('login_tocken');
  
  // Check the user's authentication status here
  const isAuthenticated = token

  useEffect(() => {
    if (!isAuthenticated) {
      history('/admin_login'); // Redirect to the login page if not authenticated
    }
  }, [isAuthenticated, history]);

  return <>{children}</>;
};

export default AuthGuard;
