import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PAGE_KEYS, QUERY_KEYS } from '../model/constants';

interface IProps {
  className?: string;
}

export const AuthButton: FC<IProps> = ({ className }) => {
  const router = useRouter();

  return (
    <div className="flex items-center">
      <button
        type="submit"
        className={`${className} mr-2 text-[24px] bg-transparent rounded-xl px-5 py-2 text-[white] border-2 border-[white]`}
      >
        Submit
      </button>
      <Link
        className="text-[20px] text-[white] py-1 px-5"
        href={`${
          router.pathname === `/${QUERY_KEYS.auth}/${PAGE_KEYS.signin}`
            ? `${PAGE_KEYS.signup}`
            : `${PAGE_KEYS.signin}`
        }`}
      >
        {router.pathname === `/${QUERY_KEYS.auth}/${PAGE_KEYS.signup}`
          ? 'уже есть аккаунт?'
          : 'нету аккаунта?'}
      </Link>
    </div>
  );
};
