import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import GoogleLogin from '../components/auth/GoogleLogin';

const Register = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  // Set page title
  useEffect(() => {
    document.title = 'Register | Anime Portal';
  }, []);
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="max-w-md mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-900">
          Join <span className="text-pink-500">Anime Portal</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Create an account to upload and process your files.
        </p>
      </div>
      
      <RegisterForm />
      
      <GoogleLogin />
    </div>
  );
};

export default Register;