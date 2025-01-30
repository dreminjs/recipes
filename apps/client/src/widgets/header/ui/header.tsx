import Link from 'next/link';
import {
  PAGE_KEYS,
  QUERY_KEYS,
  SERVICE_KEYS,
  useGetMyProfile,
} from 'apps/client/src/shared';
export const Header = () => {
  const { userInfo } = useGetMyProfile();

  return (
    <header className="border-2 py-5 px-5 mx-auto flex justify-between items-center mb-[40px] rounded-2xl">
      <Link href={'/'} className="text-[32px]">
        Recipes :)
      </Link>
      <div className="flex gap-5 items-center">
        {userInfo ? (
          <>
            <>
              {userInfo.role === 'ADMIN' && (
                <Link className="text-[20px]" href={`/${PAGE_KEYS.admin}`}>
                  Админ Панель
                </Link>
              )}
            </>

            <>
              {userInfo.isActived && (
                <Link
                  className="text-[20px]"
                  href={`${PAGE_KEYS.recipe}/${SERVICE_KEYS.post}`}
                >
                  Добавить рецепт
                </Link>
              )}
            </>
            <Link href={PAGE_KEYS.profile} className="text-[20px]">
              Профиль
            </Link>
            <Link className="text-[20px]" href={QUERY_KEYS.signout}>
              выйти
            </Link>
          </>
        ) : (
          <>
            <Link
              className="text-[20px]"
              href={`${SERVICE_KEYS.auth}/${PAGE_KEYS.signin}`}
            >
              войти
            </Link>
            <Link
              className="text-[20px]"
              href={`/${SERVICE_KEYS.auth}/${PAGE_KEYS.signup}`}
            >
              зарегистрироаваться
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
