import Image from 'next/image';
import { useGetMyProfile } from '../..';
import { AvatarInitial } from './avatar-initial';
import { EmailConfirmationStatus } from './email-confirmation-status';
import { ProfileCard } from './profile-card';
import { ProfileInfoItem } from './profile-info-item';
import { ToggleTwoFaStatus } from './toggle-2fa-status';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@/app/stores/auth.store';

export const CurrentUserPage = () => {

  const currentUser = useAtomValue(currentUserAtom)

  return (
    <ProfileCard title="Ваш профиль">
      <ProfileInfoItem
        icon={<AvatarInitial name={currentUser?.nickname} />}
        label="Имя пользователя"
        value={currentUser?.nickname}
      />

      <ProfileInfoItem
        icon={
          <Image
            src="/email-icon.svg"
            width={25}
            height={25}
            alt="email"
          />
        }
        label="Email"
        value={currentUser?.email}
        fallback="Не указан"
      />
      <EmailConfirmationStatus isActived={currentUser?.isActived} />
      <ToggleTwoFaStatus isEnabled={currentUser?.isTwoFactorEnabled} />
    </ProfileCard>
  );
};
