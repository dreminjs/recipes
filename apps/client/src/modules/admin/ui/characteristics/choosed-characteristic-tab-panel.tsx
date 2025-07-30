import { FC } from 'react';
import { TabPanel } from '@mui/lab';
import { ChoosedItemsListTab } from './choosed-items-list-tab';
import { useAtom } from 'jotai/react';
import { typeAtom, nationalCuisineAtom, holidayAtom } from 'src/app/stores/post-recipe.store';

interface IProps {
  parentNumber: string;
}

export const ChoosedCharacteristicsTabPanel: FC<IProps> = ({
  parentNumber,
}) => {
  const [type, setType] = useAtom(typeAtom);
  const [nationalCuisine, setNationalCuisine] = useAtom(nationalCuisineAtom);
  const [holiday, setHoliday] = useAtom(holidayAtom);

  return (
    <TabPanel value={parentNumber}>
      <ul className="space-y-2 p-2">
        <ChoosedItemsListTab
          onRemove={() => setType(null)}
          title={type?.title}
          type={'types'}
        />
        <ChoosedItemsListTab
          onRemove={() => setNationalCuisine(null)}
          title={nationalCuisine?.title}
          type={'holidays'}
        />
        <ChoosedItemsListTab
          onRemove={() => setHoliday(null)}
          title={holiday?.title}
          type={'national-cuisines'}
        />
      </ul>
    </TabPanel>
  );
};
