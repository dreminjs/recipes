import { Pagination } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type Props = {
  isLoading: boolean;
  error?: string;
  fitler: {
    searchValue: string;
    onChangeSearchValue: (newValue: string) => void;
  };
  pagination: {
    itemsCount?: number;
    length?: number;
    onChangePage: (newPage: number) => void;
    currentPage: number;
  };
} & PropsWithChildren;

export const PaginatedList: FC<Props> = (props) => {
  return (
    <div className='flex flex-col items-center'>
      <input
        type="text"
        placeholder="Поиск..."
        defaultValue={props.fitler.searchValue}
        onChange={(e) => props.fitler.onChangeSearchValue(e.target.value)}
        className="w-full px-4 py-2 outline-none text-amber-900 bg-amber-50 border border-amber-500 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent placeholder-amber-500 transition-all"
      />
      <ul
        className={`h-[260px] w-full p-0 list-none text-center ${
          props.pagination?.length &&
          props.pagination.length > 4 &&
          'overflow-y-scroll'
        }`}
      >
        {props.children}
        {props.pagination.length === 0 && <li>ничего не найдено :(</li>}
      </ul>
      {props.pagination.itemsCount !== 0 && (
        <Pagination
          page={props.pagination.currentPage}
          onChange={(_: unknown, currentPage: number) =>
            props.pagination.onChangePage(currentPage)
          }
          count={
            props.pagination.itemsCount
              ? Math.ceil(props.pagination.itemsCount / 10)
              : 0
          }
        />
      )}
    </div>
  );
};
