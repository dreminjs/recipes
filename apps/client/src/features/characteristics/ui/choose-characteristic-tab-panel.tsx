import { FC, useState } from 'react';
import { ChooseItemListTab } from '../model/ui/choose-item-list-tab';
import { CHOOSE_ITEM_TAB_LIST } from '../model/tab-data';
import { CustomTabList } from '../model/ui/custom-tab-list';
import { TabsLayout } from '../model/ui/tabs-layout';

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
