import { BasicModal } from '@/shared';
import { FC } from 'react';
import { InputStep } from './input-step';
import { StepsList } from './steps-list';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StepsModal: FC<IProps> = (props) => {
  return (
    <BasicModal
      sx={{ maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}
      {...props}
    >
      <InputStep />
      <StepsList />
    </BasicModal>
  );
};
