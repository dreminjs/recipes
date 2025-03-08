import { CharacteristicsProvider } from '@/application';
import { AdminHolidaysPage } from '@/pages/admin';

export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminHolidaysPage />;
    </CharacteristicsProvider>
  );
}
