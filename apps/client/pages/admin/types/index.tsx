"use client";
import { CharacteristicsProvider } from '@/application';
import { AdminTypesPage } from '@/pages/admin';

export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminTypesPage />
    </CharacteristicsProvider>
  );
}
