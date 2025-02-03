import Link from 'next/link';
import {
  AdminCharacteristicsTable,
  AdminPostIngredientModal,
} from 'apps/client/src/widgets/admin';
import { useIngredients } from '../model/hooks/use-ingredients';
import { CharactersticsLayout } from 'apps/client/src/application';
import {
  InputSearch,
  IPostCharacteristicForm,
  IPostIngredientForm,
  useCharacteristics,
} from 'apps/client/src/shared';

export const AdminIngredientPage = () => {
  const {
    newCharacteristicValue,
    selectedCharacteristics,
    onTogglePostCharacteristicModalVisibility,
    isPostCharacteristicModalVisible,
    limit,
    onChangeLimit
  } = useCharacteristics();

  const ingredientsProps = useIngredients({
    limit,
    initialPage: 0,
    initialTitle: '',
  });

  const handlePutIngredient = () => {

    if (newCharacteristicValue) {
      if (typeof newCharacteristicValue.payload === 'boolean') {
        ingredientsProps.put({
          data: { isVisible: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      } else if (
        newCharacteristicValue.payload === 'ML' ||
        newCharacteristicValue.payload === 'L' ||
        newCharacteristicValue.payload === 'KG' ||
        newCharacteristicValue.payload === 'G' ||
        newCharacteristicValue.payload === 'N'
      ) {
        ingredientsProps.put({
          data: { measure: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      } else {
        ingredientsProps.put({
          data: { title: newCharacteristicValue.payload },
          id: newCharacteristicValue.id,
        });
      }
    }
  };

  const handleDeleteIngredients = () =>
    selectedCharacteristics
      ? ingredientsProps.deleteMany(selectedCharacteristics)
      : alert('Wait!');

  const handlePostIngredient = (data: IPostIngredientForm) => {
    ingredientsProps.post(data);
    onTogglePostCharacteristicModalVisibility();
  };

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
          addiotionalColoumns={["measure"]}
          onPut={handlePutIngredient}
          onDeleteMany={handleDeleteIngredients}
          limit={limit}
          currentPage={ingredientsProps.currentPage}
          onChangePage={ingredientsProps.onChangePage}
          onChangeLimit={onChangeLimit}
          count={ingredientsProps.items?.countItems}
        />
      </CharactersticsLayout>
      <AdminPostIngredientModal
        onToggleVisibility={onTogglePostCharacteristicModalVisibility}
        onPost={handlePostIngredient}
        isOpen={isPostCharacteristicModalVisible}
      />
    </>
  );
};
