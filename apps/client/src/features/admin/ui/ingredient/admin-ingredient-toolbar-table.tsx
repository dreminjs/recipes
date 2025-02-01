import { Toolbar, Typography } from '@mui/material';
import { FC } from 'react';

interface IProps {
  onToggleIngredientModalVisibility: () => void;
}

export const AdminIngredientToolbarTable: FC<IProps> = ({
  onToggleIngredientModalVisibility,
}) => {
  return (
    <Toolbar sx={{ borderBottom: '2px solid gray' }}>
      <Typography>Ingredients</Typography>
      <button
        onClick={(event) => {
          event.preventDefault();
          onToggleIngredientModalVisibility();
        }}
        className="text-[20px] px-7 py-2 rounded-xl border-2 mx-5"
      >
        post
      </button>
    </Toolbar>
  );
};
