import { Box, Modal, BoxProps } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
} & BoxProps

export const BasicModal: FC<Props> = ({
  isOpen,
  onClose,
  children,
  ...props
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box {...props} bgcolor={"white"} borderRadius={5} marginTop={10} padding={5}>
        {children}  
      </Box>
    </Modal>
  );
};
