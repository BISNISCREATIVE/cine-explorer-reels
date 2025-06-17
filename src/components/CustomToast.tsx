
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface CustomToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const CustomToast = ({ message, isVisible, onClose }: CustomToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 md:top-24 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-[531px]">
      <div 
        className="flex justify-center items-center gap-3 px-6 py-0 bg-black/25 backdrop-blur-[20px] rounded-2xl mx-auto"
        style={{
          width: '100%',
          maxWidth: '531px',
          height: '52px',
        }}
      >
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <Check size={16} className="text-black" />
        </div>
        <span className="text-white text-base font-medium">{message}</span>
      </div>
    </div>
  );
};

export default CustomToast;
