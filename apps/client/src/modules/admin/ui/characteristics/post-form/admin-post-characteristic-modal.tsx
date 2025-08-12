import {
  BasicModal,
  CloseModalButton,
  IPostCharacteristicForm,
} from '@/shared';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { AdminPostCharacteristicForm } from './admin-post-characteristic-form';
import { isPostCharacteristicModalVisibleAtom } from 'src/app/stores/characteristics.store';

interface IProps {
  onPost: (data: IPostCharacteristicForm) => void;
  onToggleVisibility: () => void;
}

export const AdminPostCharaceteristicModal: FC<IProps> = ({
  onPost,
  onToggleVisibility,
}) => {
  const isPostCharacteristicModalVisible = useAtomValue(
    isPostCharacteristicModalVisibleAtom
  );

  return (
    <BasicModal
      isOpen={isPostCharacteristicModalVisible}
      onClose={onToggleVisibility}
      sx={{
        margin: "50px auto",
        maxWidth: 500
      }}
    >
        <AdminPostCharacteristicForm
          onPost={onPost}
          onClose={onToggleVisibility}
        />
    </BasicModal>
  );
};
