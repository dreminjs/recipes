import Link from 'next/link';
import {
  AdminIngredientsTable,
  AdminPostIngredientModal,
} from 'apps/client/src/widgets/admin';
import {
  AdminIngredientBodyTable,
  AdminIngredientHeadTable,
} from 'apps/client/src/features/admin';
import { useIngredients } from '../model/hooks/use-ingredients';
import { CharactersticsLayout } from 'apps/client/src/application';

export const AdminIngredientPage = () => {
  const {
    ingredients,
    isModalVisible,
    onToggleModalVisibility,
    handlePost,
    onSelectItemId,
    onSelectAllItems,
    selectedItems,
    isHeadcheckboxChecked,
  } = useIngredients()

  return (
    <>
      <CharactersticsLayout>
        <Link className="mb-5 underline" href="ingredient/requests">
          Заявки
        </Link>
        <AdminIngredientsTable/>
      </CharactersticsLayout>
      <AdminPostIngredientModal
        onToggleVisibility={onToggleModalVisibility}
        onPost={handlePost}
        isOpen={isModalVisible}
      />
    </>
  );
};
