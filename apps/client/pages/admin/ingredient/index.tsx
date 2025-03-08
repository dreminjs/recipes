import { CharacteristicsProvider } from '@/application';
import { AdminIngredientPage } from '@/pages/admin/';

export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminIngredientPage />;
    </CharacteristicsProvider>
  );
}
