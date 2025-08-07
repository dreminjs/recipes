import { FC, memo } from 'react';

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const InputSearch: FC<IProps> = memo(function InputSearch({
  value,
  onChange,
}) {
  return (
    <input
      className="border-b-2 outline-none p-2 w-[320px] mb-5 bg-transparent"
      onChange={onChange}
      defaultValue={value}
      type="text"
      placeholder="Search..."
      id="search-input"
    />
  );
});
