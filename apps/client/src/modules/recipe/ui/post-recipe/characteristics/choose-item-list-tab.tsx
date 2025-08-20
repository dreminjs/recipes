import TabPanel from '@mui/lab/TabPanel';
import { FC } from 'react';
import { useGetCharacteristics } from 'src/shared/api/queries/characteristic/characteristic.queries';
import { useCharacteristicActions } from '../../../../admin/model/hooks/use-characteristics-actions';
import { CharacteristicItem } from '../../../../admin/ui/characteristics/characteristic-item';
import { Characteristics } from 'interfaces';
import { PaginatedList } from '@/shared';
const LIMIT = 5;

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

  const { data, isLoading } = useGetCharacteristics({
    type,
    limit: LIMIT,
    page,
    title: searchTitle,
  });

  return (
    <TabPanel value={value}>
      <PaginatedList
        {...{ isLoading }}
        fitler={{
          searchValue: searchTitle,
          onChangeSearchValue: onChangeSearchTitle,
        }}
        pagination={{
          itemsCount: data?.itemsCount,
          length: data?.items.length,
          onChangePage,
          currentPage: page,
        }}
        containerClassName='h-[380px]'
>
        {data?.items.map((el) => (
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
        ))}
      </PaginatedList>
    </TabPanel>
  );
};
