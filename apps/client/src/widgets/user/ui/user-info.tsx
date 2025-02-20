import { useGetMyProfile } from '../api/queries';

export const UserInfo = () => {
  const { userInfo } = useGetMyProfile();

  return (
    <div itemProp='user'>
      <h3 className="text-2xl">Ваша информация</h3>
      <div>
        <p className='text-[25px]'>Ваш nickname: {userInfo?.nickname}</p>
        <p className='text-[25px]'>Ваш email: {userInfo?.email}</p>
      </div>
    </div>
  );
};
