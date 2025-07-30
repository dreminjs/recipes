import { CharacteristicsProvider } from "src/app";
import { AdminNationalCuisinesPage } from "src/modules/admin";

export default function Index() {
  return (
    <CharacteristicsProvider>
      <AdminNationalCuisinesPage />
    </CharacteristicsProvider>
  );
}
