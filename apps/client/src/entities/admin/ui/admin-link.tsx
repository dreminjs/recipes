import Link from 'next/link';
import { FC } from 'react';

interface IProps {
  href: string;
  content: string;
}

export const AdminLink: FC<IProps> = ({ href, content }) => {
  return (
    <li className='p-3 rounded-xl border-2'>
      <Link href={href}>{content}</Link>
    </li>
  );
};
