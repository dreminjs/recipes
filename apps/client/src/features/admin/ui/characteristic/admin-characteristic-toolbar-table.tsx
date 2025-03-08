import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Measure } from 'prisma/prisma-client';
import { Characteristics } from '@/interfaces*';

interface IProps {
  onPut: () => void;
  onDeleteMany: () => void;
  selectedCharacteristics: string[];
  hasNewCharacteristicValue: boolean;
  // eslint-disable-next-line no-empty-pattern
  onSetCharactersticValue: ({}: {
    payload: string | boolean;
    id: string;
    measure?: Measure;
  } | null) => void;
  onTogglePostCharacteristicModalVisibility: () => void;
  type: Characteristics
}

export const AdminCharacteristicToolBarTable: FC<IProps> = ({
  onPut,
  onDeleteMany,
  onTogglePostCharacteristicModalVisibility,
  selectedCharacteristics,
  hasNewCharacteristicValue,
  onSetCharactersticValue,
  type
}) => {
  const handleConfirmClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onPut();
    onSetCharactersticValue(null);
  };

  return (
    <Toolbar>
      {selectedCharacteristics?.length && selectedCharacteristics?.length + 1 > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedCharacteristics?.length + 1} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {type}
        </Typography>
      )}
      {(hasNewCharacteristicValue ||
        (selectedCharacteristics && selectedCharacteristics.length > 0)) && (
        <button
          className="text-[20px] px-7 py-2 rounded-xl border-2 mx-5"
          id="confirm-btn"
          onClick={handleConfirmClick}
        >
          Confirm
        </button>
      )}

      <button
        onClick={(event) => {
          event.preventDefault();
          onTogglePostCharacteristicModalVisibility();
        }}
        className="text-[20px] px-7 py-2 rounded-xl border-2 mx-5"
      >
        post
      </button>

      {selectedCharacteristics.length + 1 > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteMany}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
