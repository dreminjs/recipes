import { usePostType } from '../../../shared';
import { AdminPostCharacteristic } from '../../../features/admin';
import { MessageModal } from '../../../features/message';

export const AdminTypesPage = () => {
  const { postType, postTypeIsLoading, postTypeIsError, postTypeIsSuccess } =
    usePostType();

  return (
    <>
      <div className="flex flex-col items-center">
        <AdminPostCharacteristic
          onPost={(data) => postType(data)}
          label="type"
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
