import Image from 'next/image';
import { useGetMyProfile } from '../..';
import { AvatarInitial } from './avatar-initial';
import { EmailConfirmationStatus } from './email-confirmation-status';
import { ProfileCard } from './profile-card';
import { ProfileInfoItem } from './profile-info-item';
import { ToggleTwoFaStatus } from './toggle-2fa-status';

export const CurrentUserPage = () => {
  const { userInfo } = useGetMyProfile();

  return (
    <ProfileCard title="Ваш профиль">
      <ProfileInfoItem
        icon={<AvatarInitial name={userInfo?.nickname} />}
        label="Имя пользователя"
        value={userInfo?.nickname}
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
        value={userInfo?.email}
        fallback="Не указан"
      />
      <EmailConfirmationStatus isActived={userInfo?.isActived} />
      <ToggleTwoFaStatus isEnabled={userInfo?.isTwoFactorEnabled} />
    </ProfileCard>
  );
};
