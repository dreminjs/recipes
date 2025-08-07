import { CHOOSE_ITEM_TAB_LIST } from '@/modules/admin/model/constants';
import { ChooseItemListTab } from '@/modules/admin/ui/characteristics/choose-item-list-tab';
import { TabsLayout } from '@/modules/admin/ui/characteristics/tabs-layout';
import { FC, useState } from 'react';
import { CustomTabList } from './custom-tab-list';

interface IProps {
  parentNumber: string;
}

export const ChooseCharacteristicTabPanel: FC<IProps> = ({ parentNumber }) => {
  const [tab, setTab] = useState('0');
  const handleChange = (_: unknown, newTab: string) => {
    setTab(newTab);
  };

  return (
    <TabsLayout currentNumber={tab} parentNumber={parentNumber}>
      <CustomTabList tabs={CHOOSE_ITEM_TAB_LIST} onChange={handleChange} />
      {CHOOSE_ITEM_TAB_LIST.map(({ endpoint }, idx) => (
        <ChooseItemListTab type={endpoint} value={idx.toString()} key={idx} />
      ))}
    </TabsLayout>
  );
};
