"use client";
import { CharacteristicsProvider } from 'apps/client/src/application';
import { AdminTypesPage } from 'apps/client/src/pages-components/admin';

export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminTypesPage />
    </CharacteristicsProvider>
  );
}
