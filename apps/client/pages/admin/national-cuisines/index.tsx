import { CharacteristicsProvider } from '@/application';
import { AdminNationalCuisinesPage } from '@/pages/admin';

export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminNationalCuisinesPage />
    </CharacteristicsProvider>
  );
}
