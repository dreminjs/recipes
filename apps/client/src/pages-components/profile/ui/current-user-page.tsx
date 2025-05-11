import { ProfileInfoItem } from '@/features/user/ui/profile-info-item';
import { ProfileCard } from '@/widgets/user';
import { useGetMyProfile } from '../model/api/queries';
import { AvatarInitial } from '../model/ui/icons/avatar-initial';
import { EmailIcon } from '../model/ui/icons/email-icon';

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
    </ProfileCard>
  );
};