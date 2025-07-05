import Link from 'next/link';
import { PAGE_KEYS, QUERY_KEYS, SERVICE_KEYS } from '@/shared';
import { useGetMyProfile } from '@/features/user/';
import { useLougout } from '../api/queries';
import { ActionButton } from '../model/ui/active-button';
import { NavLink } from '../model/ui/nav-link';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { isAuthAtom } from 'src/application/stores/auth.store';

export const Header = () => {
  const isAuth = useAtomValue(isAuthAtom);

  const { userInfo, refetchUserInfo, userInfoIsSuccess } = useGetMyProfile();

  const { logoutFromAccount, isSuccesslogoutFromAccount } = useLougout();

  useEffect(() => {
    if (isSuccesslogoutFromAccount) {
      refetchUserInfo();
    }
  }, [
    isSuccesslogoutFromAccount,
    refetchUserInfo,
    userInfoIsSuccess,
    userInfo
  ]);

  return (
    <header className="w-full bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg py-4 px-8 mx-auto flex justify-between items-center mb-8 rounded-2xl border border-orange-100">
      <Link
        href={'/'}
        className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent hover:from-amber-700 hover:to-orange-700 transition-all"
      >
        Recipes :)
      </Link>

      <div className="flex gap-6 items-center">
        {isAuth && userInfo ? (
          <>
            {userInfo.role === 'ADMIN' && (
              <NavLink href={`/${PAGE_KEYS.admin}`}>Админ Панель</NavLink>
            )}

            {userInfo.isActived && (
              <NavLink href={`/${PAGE_KEYS.recipes}/${QUERY_KEYS.post}`}>
                Добавить рецепт
              </NavLink>
            )}

            <NavLink href={`/${PAGE_KEYS.profile}`}>Профиль</NavLink>

            <ActionButton onClick={() => logoutFromAccount()}>
              Выйти
            </ActionButton>
          </>
        ) : (
          <>
            <NavLink href={`/${SERVICE_KEYS.auth}/${PAGE_KEYS.signin}`}>
              Войти
            </NavLink>
            <ActionButton href={`/${SERVICE_KEYS.auth}/${PAGE_KEYS.signup}`}>
              Зарегистрироваться
            </ActionButton>
          </>
        )}
      </div>
    </header>
  );
};
