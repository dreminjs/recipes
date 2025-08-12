import { ACTION_TABS, BasicModal } from '@/shared';
import { FC, useState } from 'react';
import { TabContext } from '@mui/lab';
import { CustomTabList } from '../custom-tab-list';
import { ChooseIngredientsTab } from './choose/choose-ingredients-tab';
import { ChoosedIngredientsTab } from './choosed/choosed-ingredients-tab';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChooseIngredientsModal: FC<IProps> = (props) => {
  const [tab, setTab] = useState('0');
  const handleChange = (_: unknown, newTab: string) => {
    setTab(newTab);
  };

  return (
    <BasicModal
      sx={{
        maxWidth: 500,
        height: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      {...props}
    >
      <TabContext value={tab}>
        <CustomTabList onChange={handleChange} tabs={ACTION_TABS} />
        <ChooseIngredientsTab />
        <ChoosedIngredientsTab />
      </TabContext>
    </BasicModal>
  );
};
