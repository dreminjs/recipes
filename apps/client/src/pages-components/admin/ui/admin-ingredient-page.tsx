import Link from 'next/link';
import { AdminIngredientsTable } from '../../../widgets/admin';
import {
  AdminIngredientBodyTable,
  AdminIngredientHeadTable,
} from 'apps/client/src/features/admin';
import { useIngredients } from '../model/use-ingredients';
import { CharactersticsLayout } from 'apps/client/src/application';

export const AdminIngredientPage = () => {
  const { ingredients } = useIngredients();

  return (
    <CharactersticsLayout>
      <Link className="mb-5 underline" href="ingredient/requests">
        Заявки
      </Link>
      <AdminIngredientsTable
        head={<AdminIngredientHeadTable />}
        body={<AdminIngredientBodyTable items={ingredients?.items || []} />}
      />
    </CharactersticsLayout>
  );
};
