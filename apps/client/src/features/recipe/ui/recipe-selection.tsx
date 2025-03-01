import { FC } from 'react';
import { useGetRandomCharacteristic, useGetRecipes } from '@/shared/';
import Link from 'next/link';
import Image from "next/image"
// const obj = {
//   type: 'тип рецептов',
//   holiday: 'праздник рецептов:',
//   'national-cuisine': 'национальная кухня рецептов: ',
// };

interface IProps {
  idx: number;
  type: 'national-cuisine' | 'type' | 'holiday';
}

export const RecipeSelection: FC<IProps> = ({ idx, type }) => {
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
      <Link href={`recipes?${type}=${characteristic?.title}`}>
        {characteristic?.title}
      </Link>
      <ul>
      <Image width={100} height={100} src={'http://localhost:9000/recipes/f909b02ff87c3cb34a2782890ce866e2.jpg'} alt={'1'}/>
      </ul>
    </section>
  );
};
