import { FC, useEffect, useState } from 'react';
import { useGetRandomCharacteristic, useGetRecipes } from '../../../shared/';
import { ICharacteristic } from 'interfaces';

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

  // const [characteristicState, setCharateristicState] = useState<
  //   Omit<ICharacteristic, 'id' | 'isVisible'>
  // >({
  //   title: '',
  //   type: 'type',
  // });

  useEffect(() => {
    console.log(characteristic);
  }, [characteristic]);

  // useEffect(() => {
  //   if (characteristic) {
  //     setCharateristicState({
  //       title: characteristic.title,
  //       type: characteristic.type || "",
  //     });
  //   }
  // }, [characteristic]);

  /// ДЕЛАТЬ ОБЫЧНЫЙ ЗАПРОС НО НА ЭНДПОИНТ КОТОРЫЙ БУДЕТ ОТДАВАТЬ ТОЛЬКО ОДИН ТИП ИЛИ ПРАЗДНИК И ТД и БРАТЬ ПЕРВЫЙ ЭЛЕМЕНТ ИЗ МАССИВА И БРАТЬ ОТТУДА Т

  return (
    <section className="border-2 mx-auto w-[90%] px-5 py-2 rounded-lg mb-2">
      <h1>{characteristic?.title}</h1>
      <ul></ul>
    </section>
  );
};
