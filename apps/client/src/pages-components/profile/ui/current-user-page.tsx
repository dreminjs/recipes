import { ProfileInfoItem } from '@/features/user/ui/profile-info-item';
import { ProfileCard } from '@/features/user';
import { useGetMyProfile } from '../model/api/queries';
import { AvatarInitial } from '../model/ui/icons/avatar-initial';
import { ToggleTwoFaStatus } from '@/featuresuser/ui/toggle-2fa-status';
import { EmailConfirmationStatus } from '@/featuresuser/ui/email-confirmation-status';

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
        icon={<img src='/email-icon.svg' className='w-[25px] h-[25px]' alt='email' />}
        label="Email"
        value={userInfo?.email}
        fallback="Не указан"
      />
      <EmailConfirmationStatus isActived={userInfo?.isActived} />
      <ToggleTwoFaStatus isEnabled={userInfo?.isTwoFactorEnabled} />
    </ProfileCard>
  );
};
