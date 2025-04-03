import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logoutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg 
                className="h-10 w-10 text-purple-700" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 2L2 7L12 12L22 7L12 2Z" 
                  fill="currentColor" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 17L12 22L22 17" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 12L12 17L22 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-purple-700">
                Anime Portal
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'text-purple-700 active' : 'text-gray-700 hover:text-purple-600'}`
              }
            >
              Home
            </NavLink>
            
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'text-purple-700 active' : 'text-gray-700 hover:text-purple-600'}`
              }
            >
              About
            </NavLink>
            
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/processing" 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'text-purple-700 active' : 'text-gray-700 hover:text-purple-600'}`
                  }
                >
                  Processing
                </NavLink>
                
                <div className="relative group">
                  <button className="flex items-center space-x-1 nav-link text-gray-700 hover:text-purple-600">
                    <span>{user?.username || 'User'}</span>
                    <svg 
                      className="h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'text-purple-700 active' : 'text-gray-700 hover:text-purple-600'}`
                  }
                >
                  Login
                </NavLink>
                
                <NavLink 
                  to="/register" 
                  className="btn-primary"
                >
                  Register
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden rounded-md p-2 text-gray-700 hover:text-purple-600 hover:bg-purple-100 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `px-2 py-1 rounded-md ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-purple-50'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `px-2 py-1 rounded-md ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-purple-50'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              
              {isAuthenticated ? (
                <>
                  <NavLink 
                    to="/processing" 
                    className={({ isActive }) => 
                      `px-2 py-1 rounded-md ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-purple-50'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Processing
                  </NavLink>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-2 py-1 text-left rounded-md text-gray-700 hover:bg-purple-50"
                  >
                    Logout ({user?.username || 'User'})
                  </button>
                </>
              ) : (
                <>
                  <NavLink 
                    to="/login" 
                    className={({ isActive }) => 
                      `px-2 py-1 rounded-md ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-purple-50'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  
                  <NavLink 
                    to="/register" 
                    className="px-2 py-1 text-center rounded-md bg-purple-600 text-white hover:bg-purple-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;