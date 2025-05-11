import { FC, ReactNode } from 'react';

interface IProps {
  icon: ReactNode;
  label: string;
  value: string | undefined;
  fallback?: string;
}

export const ProfileInfoItem: FC<IProps> = ({
  icon,
  label,
  value,
  fallback = 'Не указано',
}) => (
  <div className="flex items-center">
    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
      {icon}
    </div>
    <div>
      <p className="text-sm text-amber-600 font-medium">{label}</p>
      <p className="text-lg font-semibold text-amber-900">
        {value || fallback}
      </p>
    </div>
  </div>
);
