import { CharacteristicItem } from '@/entitiescharacteristics';
import { Characteristics } from '@/interfaces*';
import TabPanel from '@mui/lab/TabPanel';
import Pagination from '@mui/material/Pagination';
import { FC } from 'react';
import { useGetCharacteristics } from 'src/shared/api/queries/characteristic/characteristic.queries';
import { useCharacteristicActions } from '../hooks/use-characteristics-actions';
const LIMIT = 5;
import Image from "next/image"
import { lupa } from '../icons/lupa';

interface IProps {
  value: string;
  type: Characteristics;
}



export const ChooseItemListTab: FC<IProps> = ({ value, type }) => {
  const {
    page,
    searchTitle,
    onChangeSearchTitle,
    onChangePage,
    onAddCharacteristic,
  } = useCharacteristicActions();

  const {
    characteristics,
    characteristicsIsError,
    characteristicsIsLoading,
    characteristicsIsSuccess,
  } = useGetCharacteristics({
    type,
    limit: LIMIT,
    page,
    title: searchTitle,
  });

  return (
    <TabPanel value={value}>
      <div className="flex flex-col items-center">
        <div className="relative w-full mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Поиск..."
            defaultValue={searchTitle}
            onChange={(e) => onChangeSearchTitle(e.target.value)}
            className="w-full px-4 py-2 outline-none text-amber-900 bg-amber-50 border border-amber-500 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent placeholder-amber-500 transition-all"
          />
            {lupa}
            {/* // TODO: change to normal svg */}
        </div>
        <ul
          className={`h-[260px] w-full p-0 list-none text-center ${
            characteristics &&
            characteristics.items.length > 4 &&
            'overflow-y-scroll'
          }`}
        >
          {characteristics && characteristics.items.length !== 0 ? (
            characteristics.items.map((el) => (
              <CharacteristicItem
                {...el}
                onClick={() =>
                  onAddCharacteristic(
                    {
                      title: el.title,
                      id: el.id,
                    },
                    type
                  )
                }
                key={el.id}
              />
            ))
          ) : (
            <li>ничего не найдено :(</li>
          )}
        </ul>
        {characteristics?.countItems !== 0 && (
          <Pagination
            page={page}
            onChange={(_: unknown, currentPage: number) =>
              onChangePage(currentPage)
            }
            count={
              characteristics?.countItems
                ? Math.ceil(characteristics.countItems / LIMIT)
                : 0
            }
          />
        )}
      </div>
    </TabPanel>
  );
};
