import { AdminPostIngredientForm } from '@/features/admin';
import { BasicModal, IPostIngredientForm } from '@/shared';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { isPostCharacteristicModalVisibleAtom } from 'src/application/providers/characteristics-provider';

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
      <button
        className="border-2 px5 py-3 text-[20px] rounded-xl"
        onClick={onToggleVisibility}
      >
        Close
      </button>
    </BasicModal>
  );
};
