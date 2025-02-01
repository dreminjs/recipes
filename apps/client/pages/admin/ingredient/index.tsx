import { CharacteristicsProvider } from 'apps/client/src/application';
import { AdminIngredientPage } from 'apps/client/src/pages-components/admin/';

export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminIngredientPage />;
    </CharacteristicsProvider>
  );
}
