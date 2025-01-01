import {
  InputSearch,
  useDeleteNationalCuisine,
  useGetNationalCuisines,
  usePostNationalCuisine,
  usePutNationalCuisine,
} from '../../../shared';
import {
  AdminCharacteristicsList,
  AdminPostCharacteristic,
} from '../../../features/admin';
import { MessageModal } from '../../../features/message';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Prisma } from 'prisma/prisma-client';

export const AdminNationalCuisinesPage = () => {
  const [title, setTitle] = useState('');

  const [isVisible, setIsVisible] = useState(false);

  const [currentCharacteristicIdx, setCurrentCharacteristicIdx] = useState<
    number | null
  >(null);

  const [value] = useDebounce(title, 500);

  const {
    postNationalCuisine,
    postNationalCuisineIsLoading,
    postNationalCuisineIsError,
    postNationalCuisineIsSuccess,
  } = usePostNationalCuisine();

  const {
    putNationalCuisine,
    putNationalCuisineIsLoading,
    putNationalCuisineIsError,
    putNationalCuisineIsSuccess,
  } = usePutNationalCuisine();

  const {
    deleteNationalCuisine,
    deleteNationalCuisineIsLoading,
    deleteNationalCuisineIsError,
    deleteNationalCuisineIsSuccess,
  } = useDeleteNationalCuisine();

  const {
    nationalCuisines,
    fetchNextPage,
    hasNextPage,
    nationalCuisinesIsError,
    nationalCuisinesIsSuccess,
    nationalCuisinesIsLoading,
    refetchNationalCuisines,
  } = useGetNationalCuisines({
    title: value,
  });

  const handleShowInput = (idx: number) => {
    setCurrentCharacteristicIdx(idx);
    setIsVisible((prev) => !prev);
  };

  const handleHideInput = () => {
    setCurrentCharacteristicIdx(null);
    setIsVisible((prev) => !prev);
  };

  const handlePutNationalCuisine = (
    data: Prisma.NationalCuisineUpdateInput,
    id: string
  ) => {
    handleHideInput();
    putNationalCuisine({ data, id });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  useEffect(() => {
    if (
      postNationalCuisineIsSuccess ||
      deleteNationalCuisineIsSuccess ||
      putNationalCuisineIsSuccess
    ) {
      refetchNationalCuisines();
    }

    console.log({
      postNationalCuisineIsSuccess,
      deleteNationalCuisineIsSuccess,
      putNationalCuisineIsSuccess,
    });
  }, [
    postNationalCuisineIsSuccess,
    deleteNationalCuisineIsSuccess,
    putNationalCuisineIsSuccess,
    refetchNationalCuisines,
    value,
  ]);

  return (
    <>
      <div className="flex flex-col items-center">
        <AdminPostCharacteristic
          onPost={(data) => postNationalCuisine(data)}
          label="national cuisine"
        />
        <InputSearch value={title} onChange={handleTitleChange} />
        <AdminCharacteristicsList
          onShowInput={handleShowInput}
          onHideInput={handleHideInput}
          visibleIdx={currentCharacteristicIdx}
          isVisible={isVisible}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          characteristicsIsError={nationalCuisinesIsError}
          characteristicsIsLoading={nationalCuisinesIsError}
          characteristicIsSuccess={nationalCuisinesIsError}
          onDelete={deleteNationalCuisine}
          onPut={handlePutNationalCuisine}
          characteristics={nationalCuisines}
        />
      </div>
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={
          postNationalCuisineIsLoading ||
          deleteNationalCuisineIsLoading ||
          putNationalCuisineIsLoading ||
          nationalCuisinesIsLoading
        }
        isError={
          postNationalCuisineIsError ||
          deleteNationalCuisineIsError ||
          putNationalCuisineIsError
        }
        isSuccess={
          postNationalCuisineIsSuccess ||
          deleteNationalCuisineIsSuccess ||
          putNationalCuisineIsSuccess
        }
      />
    </>
  );
};
