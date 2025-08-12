import Link from 'next/link';
import { useIngredients } from '../../model/hooks/use-ingredients';
import { InputSearch, IPostIngredientForm } from '@/shared';
import { useAdminCharacteristicActions } from '../../model/hooks/use-admin-characteristic-actions';
import { CharactersticsLayout } from 'src/app';
import { AdminCharacteristicsTable } from 'src/modules/admin/ui/characteristics/table/admin-characteristics-table';
import { AdminPostIngredientModal } from '../characteristics/admin-post-ingredient-modal';

export const AdminIngredientPage = () => {
  const {
    newCharacteristic,
    selectedCharacteristics,
    onToggleModalVisibility,
  } = useAdminCharacteristicActions();

  const ingredientsProps = useIngredients({
    initialLimit: 5,
    initialPage: 0,
    initialTitle: '',
  });

  return (
    <>
      <CharactersticsLayout>
        <Link className="mb-5 underline" href="ingredient/requests">
          Заявки
        </Link>
        <InputSearch
          value={ingredientsProps.title}
          onChange={ingredientsProps.onChangeTitle}
        />
        <AdminCharacteristicsTable
          addiotionalColoumns={['measure']}
          onPut={() => newCharacteristic && ingredientsProps.onPut(newCharacteristic)}
          onDeleteMany={() =>
            ingredientsProps.deleteMany(selectedCharacteristics)
          }
          limit={ingredientsProps.limit}
          currentPage={ingredientsProps.currentPage}
          onChangePage={ingredientsProps.onChangePage}
          onChangeLimit={ingredientsProps.onChangeLimit}
          count={ingredientsProps.items?.itemsCount || 0}
          type={'ingredients'}
        />
      </CharactersticsLayout>
      <AdminPostIngredientModal
        onToggleVisibility={onToggleModalVisibility}
        onPost={(data: IPostIngredientForm) => {
          ingredientsProps.post(data);
          onToggleModalVisibility();
        }}
      />
    </>
  );
};
