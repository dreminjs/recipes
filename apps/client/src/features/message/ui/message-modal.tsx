import { BasicModal } from '../../../shared';
import { FC, useEffect, useState } from 'react';

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

  const [type, setType] = useState<'isLoading' | 'isError' | 'isSuccess'>(
    'isLoading'
  );

  const handleClose = () => setIsVisible(false);

  useEffect(() => {
    if (isSuccess || isError || isLoading) {
      if (isSuccess) {
        setType('isSuccess');
      } else if (isError) {
        setType('isError');
      } else if (isLoading) {
        setType('isLoading');
      }
      setIsVisible(true);
    }

  }, [message, isError, isLoading, isSuccess]);

  useEffect(() => {
    if (isVisible && !isLoading) {
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }
  }, [isVisible, isLoading]);

  return (
    <BasicModal onClose={handleClose} isOpen={isVisible}>
      {message[type]}
    </BasicModal>
  );
};
