import { AdminPostCharacteristic } from '@/features/admin';
import {
  BasicModal,
  IPostCharacteristicForm,
  useCharacteristics,
} from '@/shared';
import { FC } from 'react';

interface IProps {
  onPost: (data: IPostCharacteristicForm) => void
}

export const AdminPostCharaceteristicModal: FC<IProps> = ({ onPost }) => {
  const {
    isPostCharacteristicModalVisible,
    onTogglePostCharacteristicModalVisibility,
  } = useCharacteristics();

  return (
    <BasicModal
      isOpen={isPostCharacteristicModalVisible}
      onClose={onTogglePostCharacteristicModalVisibility}
    >
      <AdminPostCharacteristic label="characteristic" onPost={onPost} />
      <button
        className="border-2 px5 py-3 text-[20px] rounded-xl"
        onClick={onTogglePostCharacteristicModalVisibility}
      >
        Close
      </button>
    </BasicModal>
  );
};
