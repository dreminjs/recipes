import { Box, Modal } from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const BasicModal: FC<IProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal
      className="flex flex-col items-center"
      open={isOpen}
      onClose={onClose}
    >
      <Box bgcolor={"white"} borderRadius={5} marginTop={10} padding={5}>
        {children}  
      </Box>
    </Modal>
  );
};
