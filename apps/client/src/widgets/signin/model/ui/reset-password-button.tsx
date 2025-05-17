import { PAGE_KEYS } from '@/shared*';
import Link from 'next/link';

export const ResetPassordButton = () => {
  return (
    <Link
      className="block text-center text-amber-700 underline"
      href={PAGE_KEYS['request-reset-password']}
    >
      Забыли пароль?
    </Link>
  );
};
