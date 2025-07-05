import { FC, useState } from "react";
import { useSendDisableTwoFaRequest, useSendEnableTwoFaRequest } from "../api/queries";

interface IProps {
  isEnabled?: boolean | null;
}

export const ToggleTwoFaStatus: FC<IProps> = ({ isEnabled = false }) => {
  const { mutate: sendEnableTwoFaRequest } = useSendEnableTwoFaRequest();
  const { mutate: sendDisableTwoFaRequest } = useSendDisableTwoFaRequest();
  
  const [isConfirming, setIsConfirming] = useState(false);
  
  const handleToggle = () => {
    if (isEnabled === null && !isConfirming) {
      setIsConfirming(true);
      return;
    }
    
    if (isEnabled || isConfirming) {
      sendDisableTwoFaRequest();
    } else {
      sendEnableTwoFaRequest();
    }
    
    setIsConfirming(false);
  };

  let statusText = 'Выключена';
  let toggleClasses = 'bg-gray-300';
  let thumbPosition = 'translate-x-1';
  
  if (isEnabled === true) {
    statusText = 'Включена';
    toggleClasses = 'bg-green-500';
    thumbPosition = 'translate-x-6';
  } else if (isEnabled === null || isConfirming) {
    statusText = 'Подтвердите действие';
    toggleClasses = 'bg-amber-500 opacity-70';
    thumbPosition = 'translate-x-3';
  }

  return (
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-amber-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
          />
        </svg>
      </div>
      
      <div className="flex-1">
        <p className="text-sm text-amber-600 font-medium">
          Двухфакторная аутентификация
        </p>
        <p className="text-lg font-semibold text-amber-900">
          {statusText}
        </p>
      </div>
      
      <button
        onClick={handleToggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${toggleClasses}`}
        disabled={isEnabled === null && !isConfirming}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${thumbPosition}`}
        />
        
        {(isEnabled === null || isConfirming) && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="h-3 w-3 text-white animate-pulse" 
              fill="currentColor" 
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
          </span>
        )}
      </button>
    </div>
  );
};