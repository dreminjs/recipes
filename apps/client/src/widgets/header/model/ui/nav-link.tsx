import Link from "next/link";
import { FC, ReactNode } from "react";

interface IProps {
    href: string
    children: ReactNode
}

export const NavLink: FC<IProps> = ({ href, children }) => (
    <Link
      className="text-lg font-medium text-amber-900 hover:text-orange-700 px-3 py-1 rounded-lg hover:bg-amber-100 transition-colors"
      href={href}
    >
      {children}
    </Link>
  );