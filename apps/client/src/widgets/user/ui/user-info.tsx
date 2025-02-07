import { useGetMyProfile } from '../../../shared';

import { useForm } from 'react-hook-form';
import { UserSchema } from '../modal/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserForm } from '../modal/user.interface';
import { useEffect } from 'react';

export const UserInfo = () => {
  const { userInfo } = useGetMyProfile();

  return (
    <div>
      <h3 className="text-2xl">Ваша информация</h3>
      <div>
        <p className='text-[25px]'>Ваш nickname: {userInfo?.nickname}</p>
        <p className='text-[25px]'>Ваш email: {userInfo?.email}</p>
      </div>
    </div>
  );
};
