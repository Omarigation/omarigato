import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Page transitions will be applied to the Outlet component */}
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;