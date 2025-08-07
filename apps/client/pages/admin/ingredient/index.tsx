import { CharacteristicsProvider } from "@/app";
import dynamic from "next/dynamic";

const AdminIngredientPage = dynamic(() => import("@/modules/admin").then((mod) => mod.AdminIngredientPage), { ssr: false })


export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminIngredientPage />;
    </CharacteristicsProvider>
  );
}
