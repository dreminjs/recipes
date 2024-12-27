import { FC } from 'react';

interface IProps {
  className?: string;
}

export const AuthButton: FC<IProps> = ({ className }) => {
  return <button className={className} type="submit">Submit</button>;
};
