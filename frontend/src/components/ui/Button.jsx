import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  fullWidth = false, 
  onClick, 
  className = '',
  ...props 
}) => {
  // Base button classes
  const baseClasses = 'btn-anime font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-500',
    secondary: 'bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-400',
    accent: 'bg-teal-400 text-white hover:bg-teal-500 focus:ring-teal-300',
    outline: 'border-2 border-purple-500 text-purple-700 hover:bg-purple-50 focus:ring-purple-400',
    ghost: 'bg-transparent text-purple-700 hover:bg-purple-50 focus:ring-purple-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
  };
  
  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-6 py-2',
    large: 'px-8 py-3 text-lg',
  };
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105';
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Gradient backgrounds for primary variants
  const gradientClasses = variant === 'primary' 
    ? 'bg-gradient-to-r from-purple-700 to-purple-500' 
    : variant === 'secondary' 
      ? 'bg-gradient-to-r from-pink-500 to-pink-400' 
      : variant === 'accent' 
        ? 'bg-gradient-to-r from-teal-400 to-teal-300'
        : '';
  
  // Shadow classes
  const shadowClasses = variant !== 'ghost' && variant !== 'outline'
    ? 'shadow-md hover:shadow-lg'
    : '';
  
  // Combine classes
  const classes = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.medium}
    ${disabledClasses}
    ${widthClasses}
    ${gradientClasses}
    ${shadowClasses}
    ${className}
  `;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;