import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

interface IProps {
  href: string;
  children: ReactNode;
}

export const NavLink: FC<IProps> = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href   

  return (
    <Link
      href={href}
      className={`text-lg font-medium px-3 py-1 rounded-lg transition-colors ${
        isActive
          ? 'text-orange-600 bg-amber-100'
          : 'text-amber-900 hover:text-orange-700 hover:bg-amber-100'
      }`}
    >
      {children}
    </Link>
  );
};