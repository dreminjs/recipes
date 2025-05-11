import Link from "next/link";
import { FC, ReactNode } from "react";

interface IProps {
    onClick?: () => void
    href?: string
    children: ReactNode
}

export const ActionButton: FC<IProps> = ({ onClick, href, children }) => {
    const className = "text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 px-4 py-1.5 rounded-lg transition-colors shadow-sm";
    
    return href ? (
      <Link href={href} className={className}>
        {children}
      </Link>
    ) : (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  };