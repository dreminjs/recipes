import TabPanel from '@mui/lab/TabPanel';
import { FC } from 'react';
import { useAtom } from 'jotai';
import {
  typeAtom,
  nationalCuisineAtom,
  holidayAtom
} from 'src/application/stores/post-recipe.store';
import { ChoosedItemsLitsItemTab } from './choosed-items-list-item-tab';



export const ChoosedItemsList: FC = () => {

  const [type, setType] = useAtom(typeAtom);
  const [nationalCuisine, setNationalCuisine] = useAtom(nationalCuisineAtom);
  const [holiday, setHoliday] = useAtom(holidayAtom);

  return (
    <>
      <ul className='p-0'>
        <ChoosedItemsLitsItemTab
          onRemove={() => setType(null)}
          title={type?.title}
        />
        <ChoosedItemsLitsItemTab
          onRemove={() => setNationalCuisine(null)}
          title={nationalCuisine?.title}
        />
        <ChoosedItemsLitsItemTab
          onRemove={() => setHoliday(null)}
          title={holiday?.title}
        />
      </ul>
    </>
  );
};
