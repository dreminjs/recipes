import { FC } from 'react';

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const InputSearch: FC<IProps> = ({ value, onChange }) => {
  return (
    <input
      className="border-b-2 outline-none p-2 w-[33.2%]"
      value={value}
      onChange={onChange}
      type="text"
      placeholder="Search..."
    />
  );
};
