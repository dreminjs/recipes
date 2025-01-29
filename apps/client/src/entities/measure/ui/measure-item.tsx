import { FC } from 'react';

interface IProps {
  label: string;
  value: string;
}

export const MeasureItem: FC<IProps> = ({label,value}) => {
  return <option value={value}>{label}</option>;
};
