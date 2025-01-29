import { CharacteristicsProvider } from 'apps/client/src/application';
import { AdminNationalCuisinesPage } from 'apps/client/src/pages-components/admin';

export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminNationalCuisinesPage />
    </CharacteristicsProvider>
  );
}
