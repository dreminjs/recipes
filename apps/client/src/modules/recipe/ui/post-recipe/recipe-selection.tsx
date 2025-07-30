import { FC } from 'react';
import { useGetRandomCharacteristic, useGetRecipes } from '@/shared/';
import Link from 'next/link';
import { Characteristics } from '@/interfaces*';

interface IProps {
  idx: number;
  type: Characteristics;
}

export const RecipeSelection: FC<IProps> = ({ idx, type }) => {
  const { characteristic } = useGetRandomCharacteristic({ idx, type });

  const { recipes } = useGetRecipes(
    {
      ...(characteristic && type === 'types' && { typeId: characteristic.id }),
      ...(characteristic &&
        type === 'national-cuisines' && {
          nationalCuisineId: characteristic.id,
        }),
      ...(characteristic &&
        type === 'holidays' && { holidayId: characteristic.id }),
    },
    { enabled: characteristic !== undefined }
  );

  return (
    <section className="border-2 mx-auto w-[90%] px-5 py-2 rounded-lg mb-2">
      <Link href={`recipes?${type}=${characteristic?.title}`}>
        {characteristic?.title}
      </Link>
      <ul>
      </ul>
    </section>
  );
};
