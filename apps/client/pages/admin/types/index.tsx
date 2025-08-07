
import { CharacteristicsProvider } from "@/app";
import dynamic from "next/dynamic";

export const AdminTypesPage = dynamic(() => import("@/modules/admin").then((mod) => mod.AdminTypesPage), { ssr: false })

export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminTypesPage />
    </CharacteristicsProvider>
  );
}
