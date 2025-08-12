import { BasicModal, Button, IPostIngredientForm } from '@/shared';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { AdminPostIngredientForm } from './admin-post-ingredient-form';
import { isPostCharacteristicModalVisibleAtom } from 'src/app/stores/characteristics.store';

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
      sx={{
        maxWidth: 600,
        margin: "30px auto"
      }}
    >
      <AdminPostIngredientForm onPost={onPost} />
      <Button variant="ghost" onClick={onToggleVisibility}>
        Закрыть
      </Button>
    </BasicModal>
  );
};
