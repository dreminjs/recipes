import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PAGE_KEYS } from '../model/constants';

interface IProps {
  className?: string;
}

export const AuthButton: FC<IProps> = ({ className }) => {
  const router = useRouter();

  return (
    <div className="flex items-center">
      <button
        className={`${className} mr-2 text-[24px] bg-transparent rounded-xl px-5 py-2 text-[white] border-2 border-[white]`}
        type="submit"
      >
        Submit
      </button>
      <Link
        className="text-[20px] text-[white] py-1 px-5"
        href={`${
          router.pathname === '/'
            ? `${PAGE_KEYS.signin}`
            : `${PAGE_KEYS.signup}`
        }`}
      >
        {router.pathname === '/' ? 'уже есть аккаунт?' : 'нету аккаунта?'}
      </Link>
    </div>
  );
};
