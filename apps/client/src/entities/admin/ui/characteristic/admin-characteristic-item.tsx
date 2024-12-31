import { FC } from 'react';

interface IProps {
  title: string;
  id: string;
  onDelete: (id: string) => void;
}

export const AdminCharacteristicItem: FC<IProps> = ({
  title,
  id,
  onDelete,
}) => {
  return (
    <li className="p-5 border-2 mb-5 rounded-xl flex justify-between items-center">
      <div>
        <p className="text-[25px] p-0 m-0">{title}</p>
        <p className="text-[25px] p-0 m-0">id: {id}</p>
      </div>
      <div>
        <button
          onClick={() => onDelete(id)}
          className="text-[25px] text-[red] px-5 py-2 border-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </li>
  );
};
