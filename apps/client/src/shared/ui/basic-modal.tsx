import React, { FC } from 'react';

interface IProps {
    isOpen: boolean;
    onClose (): void
    children: React.ReactNode
}

export const BasicModal: FC<IProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        {children}
      </div>
    </div>
  );
};


