import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCharacteristics } from 'apps/client/src/shared';

interface IProps {
  numSelected: number;
  onPut: () => void;
  onDeleteMany: () => void;
}

export const AdminCharacteristicToolBarTable: FC<IProps> = ({
  numSelected,
  onPut,
  onDeleteMany,
}) => {
  const {
    activeCell,
    selectedCharacteristics,
    onTogglePostCharacteristicModalVisibility,
  } = useCharacteristics();

  const handleConfirmClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onPut();
  };

  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Characteristics
        </Typography>
      )}
      {(activeCell ||
        (selectedCharacteristics && selectedCharacteristics.length > 0)) && (
        <button id="confirm-btn" onClick={handleConfirmClick}>
          Confirm
        </button>
      )}

      <button
        onClick={(event) => {
          event.preventDefault()
          onTogglePostCharacteristicModalVisibility()
        }}
        className="text-[20px] px-7 py-2 rounded-xl border-2 mx-5"
      >
        post
      </button>

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteMany}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
