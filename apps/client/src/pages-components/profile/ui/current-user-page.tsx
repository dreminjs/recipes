import { ProfileInfoItem } from '@/features/user/ui/profile-info-item';
import { ProfileCard } from '@/features/user';
import { useGetMyProfile } from '../model/api/queries';
import { AvatarInitial } from '../model/ui/icons/avatar-initial';
import { EmailIcon } from '../model/ui/icons/email-icon';
import { ToggleTwoFaStatus } from '@/featuresuser/ui/toggle-2fa-status';

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
        icon={<EmailIcon />}
        label="Email"
        value={userInfo?.email}
        fallback="Не указан"
      />
      <ToggleTwoFaStatus isEnabled={userInfo?.isTwoFactorEnabled} />
    </ProfileCard>
  );
};