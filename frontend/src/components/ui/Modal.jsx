import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  size = 'medium',
  closeOnOutsideClick = true,
  showCloseButton = true,
  className = '',
}) => {
  // Don't render if not open
  if (!isOpen) return null;
  
  // Create ref for the modal content
  const modalRef = useRef(null);
  
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  // Handle outside click
  const handleOutsideClick = (e) => {
    if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };
  
  // Size classes
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xlarge: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };
  
  // Animation classes
  const animationClasses = 'animate-modal-fade';
  
  // Style modal with anime theme
  const modalClasses = `
    bg-white rounded-lg shadow-2xl overflow-hidden
    ${sizeClasses[size] || sizeClasses.medium}
    ${animationClasses}
    ${className}
  `;
  
  // Create portal to render modal at the end of the document body
  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div 
        ref={modalRef}
        className={modalClasses}
      >
        {/* Modal header */}
        {(title || showCloseButton) && (
          <div className="flex justify-between items-center px-6 py-4 border-b border-purple-100">
            {title && (
              <h2 className="text-xl font-bold text-purple-900">{title}</h2>
            )}
            {showCloseButton && (
              <button
                className="text-gray-400 hover:text-gray-600 focus:outline-none transition duration-200"
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Modal content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;