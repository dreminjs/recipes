import { set } from 'react-hook-form';
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
}

export const MessageModal: FC<IProps> = ({
  message,
  isError,
  isLoading,
  isSuccess,
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
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    }
  }, [isVisible]);

  return (
    <BasicModal onClose={handleClose} isOpen={isVisible}>
      {message[type]}
    </BasicModal>
  );
};
