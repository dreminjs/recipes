import { AdminPostIngredientForm } from 'apps/client/src/features/admin';
import { BasicModal, IPostIngredientForm } from 'apps/client/src/shared';
import { FC } from 'react';

interface IProps {
  onPost: (data: IPostIngredientForm) => void;
  onToggleVisibility: () => void;
  isOpen: boolean;
}

export const AdminPostIngredientModal: FC<IProps> = ({
  onPost,
  onToggleVisibility,
  isOpen,
}) => {
  return (
    <BasicModal isOpen={isOpen} onClose={onToggleVisibility}>
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
