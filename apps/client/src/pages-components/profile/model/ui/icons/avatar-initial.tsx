import { FC } from "react";

interface IProps {
    name?: string;
  }
  
  export const AvatarInitial: FC<IProps> = ({ name }) => (
    <span className="text-amber-600 text-lg font-bold">
      {name?.charAt(0).toUpperCase() || '?'}
    </span>
  );