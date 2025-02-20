import { CurrentUserOwnRecipes } from '@/widgets/recipe';
import { UserInfo } from '@/widgets/user';

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
