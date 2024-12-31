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
import { useState } from 'react';

export const AdminTypesPage = () => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const { postType, postTypeIsLoading, postTypeIsError, postTypeIsSuccess } =
    usePostType();

  const {} = usePutType();

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
    title,
  });

  return (
    <>
      <div className="flex flex-col items-center">
        <AdminPostCharacteristic
          onPost={(data) => postType(data)}
          label="type"
        />
        <InputSearch value={title} onChange={handleTitleChange} />
        <AdminCharacteristicsList
          characteristicIsSuccess={postTypeIsSuccess || deleteTypeIsSuccess}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          refetchCharacteristics={refetchTypes}
          characteristicsIsLoading={typesIsLoading || deleteTypeIsLoading}
          characteristicsIsError={typesIsError || deleteTypeIsError}
          characteristics={types}
          onDelete={deleleType}
        />
      </div>
      <MessageModal
        message={{
          isSuccess: 'Тип загружен!',
          isError: 'Ошибка! проверте данные',
          isLoading: 'Загрузка...',
        }}
        isLoading={postTypeIsLoading}
        isError={postTypeIsError}
        isSuccess={postTypeIsSuccess}
      />
    </>
  );
};
