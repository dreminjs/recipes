import { AdminPostIngredientForm } from '@/features/admin';
import { BasicModal, CloseModalButton, IPostIngredientForm } from '@/shared';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { isPostCharacteristicModalVisibleAtom } from 'src/application/stores/characteristics.store';

interface IProps {
  onPost: (data: IPostIngredientForm) => void;
  onToggleVisibility: () => void;
}

export const AdminPostIngredientModal: FC<IProps> = ({
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
    >
      <AdminPostIngredientForm onPost={onPost} />
      <CloseModalButton onClick={onToggleVisibility} />
    </BasicModal>
  );
};
