import { BasicModal } from '@/shared';
import { FC,useEffect, useState } from 'react';

interface IProps {
  message: {
    isSuccess: string;
    isError: string;
    isLoading: string;
  };
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  className?: string;
}

export const MessageModal: FC<IProps> = ({
  message,
  isError,
  isLoading,
  isSuccess,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState<'isLoading' | 'isError' | 'isSuccess'>('isLoading');

  const handleClose = () => setIsVisible(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSuccess) {
      setType('isSuccess');
      setIsVisible(true);
      timer = setTimeout(() => setIsVisible(false), 2000);
    } else if (isError) {
      setType('isError');
      setIsVisible(true);
      timer = setTimeout(() => setIsVisible(false), 2000);
    }

    return () => clearTimeout(timer);
  }, [isError, isSuccess]);

  return (
    <BasicModal onClose={handleClose} isOpen={isVisible}>
      {message[type]}
    </BasicModal>
  );
};