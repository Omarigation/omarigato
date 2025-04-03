import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const GoogleLogin = () => {
  const { googleLoginUser, loading } = useContext(AuthContext);

  useEffect(() => {
    // Load Google's script asynchronously
    const loadGoogleScript = () => {
      // Check if the script is already loaded
      if (document.querySelector('script#google-login')) {
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-login';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      
      // Initialize Google Sign-In after script loads
      script.onload = initializeGoogleSignIn;
    };
    
    loadGoogleScript();
    
    return () => {
      // Clean up Google Sign-In on unmount
      const googleScript = document.querySelector('script#google-login');
      if (googleScript) {
        googleScript.remove();
      }
    };
  }, []);
  
  const initializeGoogleSignIn = () => {
    if (!window.google) return;
    
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
      callback: handleGoogleResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    
    window.google.accounts.id.renderButton(
      document.getElementById('google-login-button'),
      { 
        theme: 'outline', 
        size: 'large', 
        width: '100%',
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'center',
      }
    );
  };
  
  const handleGoogleResponse = async (response) => {
    if (response.credential) {
      // Send the token to your backend
      await googleLoginUser(response.credential);
    }
  };
  
  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-full border-t border-gray-200"></div>
        <div className="px-4 text-sm text-gray-500">or</div>
        <div className="w-full border-t border-gray-200"></div>
      </div>
      
      <div id="google-login-button" className="flex justify-center"></div>
      
      {loading && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Logging in with Google...
        </div>
      )}
    </div>
  );
};

export default GoogleLogin;