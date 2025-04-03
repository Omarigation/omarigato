import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const About = () => {
  // Set page title
  useEffect(() => {
    document.title = 'About | Anime Portal';
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header section */}
      <section className="text-center">
        <h1 className="text-3xl font-bold text-purple-900 mb-6">About Anime Portal</h1>
        <div className="divider-anime"></div>
      </section>
      
      {/* About the platform */}
      <section>
        <Card>
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Our Platform</h2>
          <p className="text-gray-700 mb-4">
            Anime Portal is a specialized file processing and analysis platform designed with an anime-inspired 
            aesthetic. Our mission is to provide users with a fun and efficient way to handle their files, 
            from simple document processing to complex data analysis.
          </p>
          <p className="text-gray-700">
            Whether you're looking to analyze CSV data, process text documents, or organize a collection of files, 
            our platform offers the tools you need with an interface that makes file management enjoyable.
          </p>
        </Card>
      </section>
      
      {/* Features section */}
      <section>
        <h2 className="text-2xl font-bold text-purple-900 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature 1 */}
          <Card>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg 
                    className="h-6 w-6 text-purple-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Secure File Handling</h3>
                <p className="text-gray-600">
                  Your files are securely processed and stored, with strict privacy measures in place to protect your data.
                </p>
              </div>
            </div>
          </Card>
          
          {/* Feature 2 */}
          <Card>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="p-3 bg-pink-100 rounded-full">
                  <svg 
                    className="h-6 w-6 text-pink-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" 
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Beautiful Interface</h3>
                <p className="text-gray-600">
                  Enjoy our anime-inspired design that makes file processing a visually pleasing experience.
                </p>
              </div>
            </div>
          </Card>
          
          {/* Feature 3 */}
          <Card>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="p-3 bg-teal-100 rounded-full">
                  <svg 
                    className="h-6 w-6 text-teal-600" 
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
              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Multiple File Types</h3>
                <p className="text-gray-600">
                  Support for various file formats including images, PDFs, text files, CSVs, and Excel spreadsheets.
                </p>
              </div>
            </div>
          </Card>
          
          {/* Feature 4 */}
          <Card>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg 
                    className="h-6 w-6 text-blue-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" 
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Fast Processing</h3>
                <p className="text-gray-600">
                  Advanced algorithms ensure quick and efficient processing of your files with minimal wait time.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      {/* Technology stack */}
      <section>
        <Card>
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Our Technology</h2>
          <p className="text-gray-700 mb-4">
            Anime Portal is built using modern technologies to ensure a fast, secure, and seamless experience:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Frontend</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>React for a responsive user interface</li>
                <li>TailwindCSS for beautiful styling</li>
                <li>Context API for state management</li>
                <li>React Router for navigation</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Backend</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>FastAPI for high-performance API endpoints</li>
                <li>SQLAlchemy with MS SQL Server for data storage</li>
                <li>JWT for secure authentication</li>
                <li>Various libraries for file processing</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>
      
      {/* Call to action */}
      <section className="text-center">
        <Card className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6">
            Join Anime Portal today and experience a new way to handle your files!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button variant="secondary" size="large">
                Create Account
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="large" className="bg-white hover:bg-gray-100 text-purple-600 border-white">
                Learn More
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default About;