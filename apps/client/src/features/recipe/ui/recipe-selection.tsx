import { FC, useEffect, useState } from 'react';
import { useGetRandomCharacteristic, useGetRecipes } from '../../../shared/';
import { ICharacteristic } from 'interfaces';
import Link from 'next/link';

interface IProps {
  idx: number;
  type: 'national-cuisine' | 'type' | 'holiday';
}

export const RecipeSelection: FC<IProps> = ({ idx, type }) => {
  const obj = {
    type: 'тип рецептов',
    holiday: 'праздник рецептов:',
    'national-cuisine': 'национальная кухня рецептов: ',
  };

  const { characteristic } = useGetRandomCharacteristic({ idx, type });

  const { recipes } = useGetRecipes(
    {
      ...(characteristic && type === 'type' && { typeId: characteristic.id }),
      ...(characteristic &&
        type === 'national-cuisine' && {
          nationalCuisineId: characteristic.id,
        }),
      ...(characteristic &&
        type === 'holiday' && { holidayId: characteristic.id }),
    },
    { enabled: characteristic !== undefined }
  );

  return (
    <section className="border-2 mx-auto w-[90%] px-5 py-2 rounded-lg mb-2">
      <Link href={`recipes?${type}=${characteristic?.title}`}>{characteristic?.title}</Link>
      <ul></ul>
    </section>
  );
};
