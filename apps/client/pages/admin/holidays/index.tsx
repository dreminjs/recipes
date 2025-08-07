import { CharacteristicsProvider } from '@/app';
import dynamic from 'next/dynamic';


const AdminHolidaysPage = dynamic(() => import("@/modules/admin").then((mod) => mod.AdminHolidaysPage), { ssr: false })

export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminHolidaysPage />
    </CharacteristicsProvider>
  );
}
