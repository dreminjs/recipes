import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PAGE_KEYS, QUERY_KEYS } from '../model/constants';

interface AuthButtonProps {
  isLoading?: boolean;
  className?: string;

}

export const AuthButton: FC<AuthButtonProps> = ({ isLoading, className }) => {
  const router = useRouter();

  const isSingup = router.pathname === `/${QUERY_KEYS.auth}/${PAGE_KEYS.signup}`

  return (
    <div className="flex flex-col gap-4 mt-6">
      <button
        type="submit"
        disabled={isLoading}
        className={`bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xl font-semibold py-3 px-6 rounded-lg shadow-md hover:from-amber-600 hover:to-orange-600 transition-all ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        } ${className}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            Загрузка...
          </span>
        ) : (
          isSingup ? "регистрация" : "вход"
        )}
      </button>

      <div className="text-center">
        <Link
          href={
            router.pathname === `/${QUERY_KEYS.auth}/${PAGE_KEYS.signin}`
              ? `${PAGE_KEYS.signup}`
              : `${PAGE_KEYS.signin}`
          }
          className="text-amber-700 hover:text-orange-700 font-medium transition-colors"
        >
          {isSingup
            ? 'Уже есть аккаунт? Войти'
            : 'Нет аккаунта? Зарегистрироваться'}
        </Link>
      </div>
    </div>
  );
};
