import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import GoogleLogin from '../components/auth/GoogleLogin';

const Login = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  // Set page title
  useEffect(() => {
    document.title = 'Login | Anime Portal';
  }, []);
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="max-w-md mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-900">
          Login to <span className="text-pink-500">Anime Portal</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Log in to your account to continue.
        </p>
      </div>
      
      <LoginForm />
      
      <GoogleLogin />
    </div>
  );
};

export default Login;