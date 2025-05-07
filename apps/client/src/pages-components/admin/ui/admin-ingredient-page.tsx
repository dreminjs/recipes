import Link from 'next/link';
import { AdminPostIngredientModal } from '@/widgets/admin';
import { useIngredients } from '../model/hooks/use-ingredients';
import { CharactersticsLayout } from '@/application/';
import { InputSearch, IPostIngredientForm } from '@/shared';
import dynamic from 'next/dynamic';
import { useAdminCharacteristicActions } from '../model/hooks/use-admin-characteristic-actions';
import { MessageModal } from '@/featuresmessage';

const AdminCharacteristicsTable = dynamic(
  () => import('@/widgets/admin/').then((mod) => mod.AdminCharacteristicsTable),
  { ssr: false }
);

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
          count={ingredientsProps.items?.countItems || 0}
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
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={ingredientsProps.isLoading}
        isError={ingredientsProps.isError}
        isSuccess={ingredientsProps.isSuccess}
      />
    </>
  );
};
