import { CharacteristicsProvider } from "@/app";
import dynamic from "next/dynamic";

const AdminNationalCuisinesPage = dynamic(() => import("@/modules/admin").then((mod) => mod.AdminNationalCuisinesPage), { ssr: false })

export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminNationalCuisinesPage />
    </CharacteristicsProvider>
  );
}
