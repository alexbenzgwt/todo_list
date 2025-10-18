// Utility functions for modal positioning and responsive behavior
import { useState, useEffect } from 'react';

export const getModalPosition = (preferredPosition = 'right') => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // For very small screens (mobile)
  if (viewportWidth < 640) {
    return {
      position: 'center',
      width: 'calc(100vw - 1rem)',
      maxWidth: '320px',
      top: '1rem',
      left: '0.5rem',
      right: '0.5rem'
    };
  }
  
  // For small screens (tablet)
  if (viewportWidth < 768) {
    return {
      position: preferredPosition,
      width: '350px',
      maxWidth: '350px',
      top: '3rem',
      right: preferredPosition === 'right' ? '1rem' : 'auto',
      left: preferredPosition === 'left' ? '1rem' : 'auto'
    };
  }
  
  // For larger screens
  return {
    position: preferredPosition,
    width: '450px',
    maxWidth: '450px',
    top: '5rem',
    right: preferredPosition === 'right' ? '1.5rem' : 'auto',
    left: preferredPosition === 'left' ? '1.5rem' : 'auto'
  };
};

export const getModalClasses = (preferredPosition = 'right') => {
  const position = getModalPosition(preferredPosition);
  
  if (position.position === 'center') {
    return 'fixed inset-0 flex items-center justify-center p-2 sm:p-4';
  }
  
  return `fixed ${position.top} ${position.right ? `right-${position.right.includes('1.5') ? '6' : '4'}` : ''} ${position.left ? `left-${position.left.includes('1.5') ? '6' : '4'}` : ''} w-[${position.width}] max-w-[${position.maxWidth}] z-50`;
};

export const handleModalOverflow = (element) => {
  if (!element) return;
  
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Check if modal goes outside viewport
  if (rect.right > viewportWidth) {
    element.style.right = '1rem';
    element.style.left = 'auto';
  }
  
  if (rect.bottom > viewportHeight) {
    element.style.top = '1rem';
    element.style.bottom = 'auto';
  }
  
  if (rect.left < 0) {
    element.style.left = '1rem';
    element.style.right = 'auto';
  }
  
  if (rect.top < 0) {
    element.style.top = '1rem';
    element.style.bottom = 'auto';
  }
};

// Hook for responsive modal positioning
export const useModalPosition = (preferredPosition = 'right') => {
  const [position, setPosition] = useState(() => getModalPosition(preferredPosition));
  
  useEffect(() => {
    const updatePosition = () => {
      setPosition(getModalPosition(preferredPosition));
    };
    
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [preferredPosition]);
  
  return position;
};
