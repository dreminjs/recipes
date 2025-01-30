import { CharacteristicsProvider } from 'apps/client/src/application';
import { AdminHolidaysPage } from '../../../src/pages-components/admin';

export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminHolidaysPage />;
    </CharacteristicsProvider>
  );
}
