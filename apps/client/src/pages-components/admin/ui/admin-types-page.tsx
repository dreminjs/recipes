import {
  InputSearch,
  useDeleteType,
  useGetTypes,
  usePostType,
  usePutType,
} from '../../../shared';
import {
  AdminCharacteristicsList,
  AdminPostCharacteristic,
} from '../../../features/admin';
import { MessageModal } from '../../../features/message';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from 'use-debounce';
import { Prisma } from 'prisma/prisma-client';

export const AdminTypesPage = () => {
  const [title, setTitle] = useState('');

  const [isVisible, setIsVisible] = useState(false);

  const [currentCharacteristicIdx, setCurrentCharacteristicIdx] = useState<
    number | null
  >(null);

  const [value] = useDebounce(title, 500);

  const { putType, putTypeIsLoading, putTypeIsError, putTypeIsSuccess } =
    usePutType();

  const {
    deleleType,
    deleteTypeIsLoading,
    deleteTypeIsError,
    deleteTypeIsSuccess,
  } = useDeleteType();

  const {
    types,
    typesIsLoading,
    fetchNextPage,
    hasNextPage,
    typesIsError,
    typesIsSuccess,
    refetchTypes,
  } = useGetTypes({
    title: value,
  });

  const handleToggleInputVisibility = (idx: number) => {
    setCurrentCharacteristicIdx(idx);
    setIsVisible((prev) => !prev);
  };

  const handlePutType = (data: Prisma.TypeUpdateInput, id: string) => {
    handleToggleInputVisibility(-1);
    putType({ data, id });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const { postType, postTypeIsLoading, postTypeIsError, postTypeIsSuccess } =
    usePostType();

  useEffect(() => {
    if (
      typesIsSuccess ||
      postTypeIsSuccess ||
      deleteTypeIsSuccess ||
      putTypeIsSuccess
    ) {
      refetchTypes();
    }
  }, [
    typesIsSuccess,
    refetchTypes,
    postTypeIsSuccess,
    deleteTypeIsSuccess,
    putTypeIsSuccess,
    value,
  ]);

  return (
    <>
      <div className="flex flex-col items-center">
        <AdminPostCharacteristic
          onPost={(data) => postType(data)}
          label="type"
        />
        <InputSearch value={title} onChange={handleTitleChange} />
        <AdminCharacteristicsList
          onToggleVisibility={handleToggleInputVisibility}
          visibleIdx={currentCharacteristicIdx}
          isVisible={isVisible}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          characteristicsIsError={typesIsError}
          characteristicsIsLoading={typesIsError}
          characteristicIsSuccess={typesIsError}
          onDelete={deleleType}
          onPut={handlePutType}
          characteristics={types}
        />
      </div>
      <MessageModal
        message={{
          isSuccess: 'Успешно',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={postTypeIsLoading || deleteTypeIsLoading}
        isError={postTypeIsError}
        isSuccess={postTypeIsSuccess || deleteTypeIsSuccess}
      />
    </>
  );
};
