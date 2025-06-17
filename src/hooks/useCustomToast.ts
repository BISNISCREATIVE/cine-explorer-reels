
import { useState } from 'react';

export const useCustomToast = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  const hideToast = () => {
    setIsToastVisible(false);
  };

  return {
    toastMessage,
    isToastVisible,
    showToast,
    hideToast,
  };
};
