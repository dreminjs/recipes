import { CharacteristicItem } from '@/entitiescharacteristics';
import { Characteristics } from '@/interfaces*';
import TabPanel from '@mui/lab/TabPanel';
import Pagination from '@mui/material/Pagination';
import { FC } from 'react';
import { useGetCharacteristics } from 'src/shared/api/queries/characteristic/characteristic.queries';
import { useCharacteristicActions } from '../hooks/use-characteristics-actions';
const LIMIT = 5;

interface IProps {
  value: string;
  type: Characteristics;
}

export const ChooseItemListTab: FC<IProps> = ({ value, type }) => {
  const { page, searchTitle, onChangeSearchTitle, onChangePage, onAddCharacteristic } =
    useCharacteristicActions();

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
        <input
          className="border-b-2 mb-3 text-[16px] outline-none"
          type="text"
          placeholder="search..."
          defaultValue={searchTitle}
          onChange={(e) => onChangeSearchTitle(e.target.value)}
        />
        <ul
          className={`h-[200px] list-none p-0 pr-5 w-[80%] text-center ${
            characteristics &&
            characteristics.items.length > 4 &&
            'overflow-y-scroll'
          }`}
        >
          {characteristics && characteristics.items.length !== 0 ? (
            characteristics.items.map((el) => (
              <CharacteristicItem
                {...el}
                onClick={() => onAddCharacteristic({
                  title: el.title,
                  id: el.id
                },type)}
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
