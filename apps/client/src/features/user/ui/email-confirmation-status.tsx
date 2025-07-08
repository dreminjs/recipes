import { FC, useState } from "react";
import { useResendEmailConfirmation } from "../api/queries"


interface IProps {
    isActived?: boolean | null
}

export const EmailConfirmationStatus: FC<IProps> = ({ isActived = false }) => {
  const { 
    isSuccess,
    isPending,
    mutate: resendEmail
  } = useResendEmailConfirmation();
  
  const [isConfirming, setIsConfirming] = useState(false);
  
  const handleAction = () => {
    if (isActived === null && !isConfirming) {
      setIsConfirming(true);
      return;
    }
    
    if (isConfirming || !isActived) {
      resendEmail();
    }
    
    setIsConfirming(false);
  };

  const statusText = isActived ? 'Подтверждён' : 'Не подтверждён';
  const iconBg = isActived ? 'bg-green-100' : 'bg-amber-100';
  const statusColor = isActived ? 'text-green-900' : 'text-amber-900';
  const buttonText = isPending ? 'Отправка...' : isSuccess ? 'Отправлено!' : 'Подтвердить';

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center mr-4`}>
          <img 
            src={'/confirm-email-icon.svg'} 
            alt="Status icon"
            className="h-[25px] w-[25px]"
          />
        </div>
        <div>
          <p className="text-sm text-amber-600 font-medium">
            Подтверждение email
          </p>
          <p className={`text-base font-semibold ${statusColor}`}>
            {statusText}
          </p>
        </div>
      </div>
      
      {!isActived && (
        <button
          onClick={handleAction}
          disabled={isPending || isSuccess}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            isSuccess
              ? 'bg-green-100 text-green-700'
              : isPending
              ? 'bg-gray-100 text-gray-600'
              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
          } transition-colors`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};