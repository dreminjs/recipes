import Link from 'next/link';
import { useGetMyProfile } from 'apps/client/src/shared';
export const Header = () => {
  const { userInfo } = useGetMyProfile();

  return (
    <header className="border-2 py-5 px-5 mx-auto flex justify-between items-center mb-[40px] rounded-2xl">
      <Link href={'/'} className="text-[32px]">
        Recipes :)
      </Link>

      <Link href="admin"></Link>
      <div className="flex gap-5 items-center">
        {userInfo?.role === 'ADMIN' && (
          <Link className="text-[20px]" href={'admin'}>
            Админ Панель
          </Link>
        )}

        <Link className="text-[20px]" href={'/recipe/post'}>
          Добавить рецепт
        </Link>
        <Link href="/profile">
          Профиль
        </Link>
      </div>
    </header>
  );
};
