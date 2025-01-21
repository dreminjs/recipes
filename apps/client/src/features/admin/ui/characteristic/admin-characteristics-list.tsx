import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { AdminCharacteristicItem } from '../../../../entities/admin';
import { InfiniteData } from '@tanstack/react-query';
import { ICharacteristic, InfiniteScrollResponse } from 'interfaces';

interface IProps {
  characteristicsIsError: boolean;
  characteristicsIsLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  characteristicIsSuccess: boolean;
  characteristics?: InfiniteData<
    InfiniteScrollResponse<Omit<ICharacteristic, 'type'>>
  >;
  onDelete(id: string): void;
  visibleIdx: number | null;

  onShowInput: (idx: number) => void;
  onHideInput: () => void;
  onPut(data: { title: string }, id: string): void;
}

export const AdminCharacteristicsList: FC<IProps> = ({
  characteristicIsSuccess,
  fetchNextPage,
  hasNextPage,
  characteristicsIsLoading,
  characteristicsIsError,
  characteristics,
  onDelete,
  onHideInput,
  onShowInput,
  visibleIdx,
  onPut,
}) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <ul className="list-none p-5 w-[65%]">
      {characteristicsIsLoading && <li className="text-[32px] ">Loading...</li>}
      {characteristicsIsError && <li className="text-[32px] ">Error</li>}
      {characteristics?.pages?.map((page) =>
        page?.data?.map(({ title, id }, idx) => (
          <AdminCharacteristicItem
            onShowInput={onShowInput}
            onHideInput={onHideInput}
            onDelete={onDelete}
            title={title}
            id={id}
            key={id}
            currentIdx={idx}
            visibleIdx={visibleIdx}
            onPut={onPut}
          />
        ))
      )}
      <li ref={ref} />
    </ul>
  );
};
