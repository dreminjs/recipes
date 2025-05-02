import { AdminPostCharacteristic } from '@/features/admin';
import {
  BasicModal,
  IPostCharacteristicForm,
} from '@/shared';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { isPostCharacteristicModalVisibleAtom } from 'src/application/providers/characteristics-provider';

interface IProps {
  onPost: (data: IPostCharacteristicForm) => void
  onToggleVisible: () => void
}

export const AdminPostCharaceteristicModal: FC<IProps> = ({ onPost, onToggleVisible }) => {

  const isPostCharacteristicModalVisible = useAtomValue(isPostCharacteristicModalVisibleAtom)

  return (
    <BasicModal
      isOpen={isPostCharacteristicModalVisible}
      onClose={onToggleVisible}
    >
      <AdminPostCharacteristic label="characteristic" onPost={onPost} />
      <button
        className="border-2 px-5 py-3 text-[20px] rounded-xl"
        onClick={onToggleVisible}
      >
        Close
      </button>
    </BasicModal>
  );
};
