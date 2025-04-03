import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  hover = true,
  bordered = true,
  shadow = true,
  glass = false,
  padding = 'medium',
  className = '',
  ...props
}) => {
  // Base card classes
  const baseClasses = 'bg-white rounded-lg transition-all duration-300';
  
  // Padding classes
  const paddingClasses = {
    none: '',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  };
  
  // Hover effect
  const hoverClasses = hover 
    ? 'hover:shadow-lg hover:-translate-y-1' 
    : '';
  
  // Border classes
  const borderClasses = bordered 
    ? 'border border-purple-100' 
    : '';
  
  // Shadow classes
  const shadowClasses = shadow 
    ? 'shadow-md' 
    : '';
  
  // Glass effect classes
  const glassClasses = glass 
    ? 'bg-opacity-70 backdrop-filter backdrop-blur-lg' 
    : '';
  
  // Combine classes
  const cardClasses = `
    ${baseClasses}
    ${paddingClasses[padding] || paddingClasses.medium}
    ${hoverClasses}
    ${borderClasses}
    ${shadowClasses}
    ${glassClasses}
    ${className}
  `;

  return (
    <div className={cardClasses} {...props}>
      {/* Card header if title or subtitle exists */}
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-xl font-bold text-purple-900">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      )}
      
      {/* Card content */}
      <div>{children}</div>
      
      {/* Card footer */}
      {footer && (
        <div className="mt-4 pt-3 border-t border-purple-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;