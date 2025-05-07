import { FC } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Characteristics } from '@/interfaces*';
import {
  isPostCharacteristicModalVisibleAtom,
  newCharacteristicAtom,
  selectedCharacteristicsIdsAtom,
} from 'src/application/stores/characteristics.store';

interface IProps {
  onPut: () => void;
  onDeleteMany: () => void;
  type: Characteristics;
}

export const AdminCharacteristicToolBarTable: FC<IProps> =
  function ({ onPut, onDeleteMany, type }) {
    const selectedCharacteristicsIds = useAtomValue(
      selectedCharacteristicsIdsAtom
    );
    const newCharacteristic = useAtomValue(newCharacteristicAtom);
    const setIsPostModalVisible = useSetAtom(
      isPostCharacteristicModalVisibleAtom
    );
    const hasSelected = selectedCharacteristicsIds.length > 0;
    return (
      <Toolbar>
        {hasSelected ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selectedCharacteristicsIds.length} selected
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

        {newCharacteristic?.payload !== undefined && (
          <Button
            onClick={(event) => {
              event.preventDefault();
              onPut();
            }}
            variant="outlined"
            id="confirm-btn"
            sx={{ mx: 2 }}
          >
            Confirm
          </Button>
        )}

        <Button
          onClick={(event) => {
            event.preventDefault();
            setIsPostModalVisible(true);
          }}
          variant="outlined"
          sx={{ mx: 1 }}
        >
          Post
        </Button>

        {hasSelected && (
          <Tooltip title="Delete">
            <IconButton onClick={onDeleteMany}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

