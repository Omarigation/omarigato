import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import FileUpload from '../components/file/FileUpload';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
          Welcome to <span className="text-pink-500">Anime Portal</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload, process, and analyze your files with our anime-themed portal.
        </p>
        
        {!isAuthenticated && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button variant="primary" size="large">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="large">
                Log In
              </Button>
            </Link>
          </div>
        )}
      </section>
      
      {/* Main Content */}
      {isAuthenticated ? (
        <section>
          <FileUpload />
        </section>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <svg 
                  className="h-8 w-8 text-purple-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-2">Easy File Upload</h3>
            <p className="text-gray-600">
              Upload your files with a simple drag and drop interface. We support various file formats.
            </p>
          </Card>
          
          {/* Feature Card 2 */}
          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-pink-100 rounded-full">
                <svg 
                  className="h-8 w-8 text-pink-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-2">Automatic Processing</h3>
            <p className="text-gray-600">
              Our system automatically processes your files and extracts useful information.
            </p>
          </Card>
          
          {/* Feature Card 3 */}
          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-teal-100 rounded-full">
                <svg 
                  className="h-8 w-8 text-teal-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-2">Data Analysis</h3>
            <p className="text-gray-600">
              View detailed analysis and visualization of your processed data in a user-friendly format.
            </p>
          </Card>
        </section>
      )}
      
      {/* How It Works Section */}
      <section className="bg-purple-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-900 text-center mb-8">
            How It Works
          </h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white text-purple-700 text-2xl font-bold border-2 border-purple-200">
                  1
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-purple-900 mb-2">Create an Account</h3>
                <p className="text-gray-600">
                  Sign up for a free account or log in with your Google account to get started.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white text-pink-500 text-2xl font-bold border-2 border-pink-200">
                  2
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-purple-900 mb-2">Upload Your Files</h3>
                <p className="text-gray-600">
                  Upload your files using our simple drag and drop interface. We support various file formats including images, PDFs, text files, CSVs, and Excel files.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white text-teal-500 text-2xl font-bold border-2 border-teal-200">
                  3
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-purple-900 mb-2">View Results</h3>
                <p className="text-gray-600">
                  Once your file is processed, you'll see detailed information and analysis based on the file type. You can reprocess or delete files as needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;