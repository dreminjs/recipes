import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { AdminCharacteristicItem } from '../../../../entities/admin';
import { InfiniteData } from '@tanstack/react-query';
import { ICharacteristic, InfiniteScrollResponse } from 'interfaces';

interface IProps {
  characteristicIsSuccess: boolean;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  refetchCharacteristics: () => void;
  characteristicsIsLoading: boolean;
  characteristicsIsError: boolean;
  characteristics?: InfiniteData<
    InfiniteScrollResponse<Omit<ICharacteristic, 'type'>>
  >;
  onDelete(id: string): void;
}

export const AdminCharacteristicsList: FC<IProps> = ({
  characteristicIsSuccess,
  fetchNextPage,
  hasNextPage,
  refetchCharacteristics,
  characteristicsIsLoading,
  characteristicsIsError,
  characteristics,
  onDelete,
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (characteristicIsSuccess) {
      refetchCharacteristics();
    }
  }, [characteristicIsSuccess, refetchCharacteristics]);

  return (
    <ul className="list-none p-5 w-[65%]">
      {characteristicsIsLoading && <li className="text-[32px] ">Loading...</li>}
      {characteristicsIsError && <li className="text-[32px] ">Error</li>}
      {characteristics?.pages?.map((page) =>
        page?.data?.map(({ title, id }) => (
          <AdminCharacteristicItem
            onDelete={onDelete}
            title={title}
            id={id}
            key={id}
          />
        ))
      )}
      <li ref={ref} />
    </ul>
  );
};
