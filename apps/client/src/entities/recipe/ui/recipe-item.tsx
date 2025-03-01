import Link from 'next/link';
import { FC } from 'react';


interface IProps {
  id: string;
}

export const RecipeItem: FC<IProps> = ({ id }) => {
  return (
    <li>
      <Link href={`recipe/${id}`}>
        
      </Link>
    </li>
  );
};
