import { CurrentUserOwnRecipes } from '@/widgets/recipe';
import { UserInfo } from '@/featuresuser';

export const CurrentUserPage = () => {

  return (
    <>
    <div>
      <UserInfo />
      <CurrentUserOwnRecipes />
    </div>
    </>
  );
};
