import { FC, ReactNode, useEffect } from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  className?: string;
  title?: string;
}

export const BasicModal: FC<IProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  title,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
      />

      <div
        className={`relative w-full max-w-2xl rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 shadow-xl border border-orange-200 ${className}`}
      >
        {title && (
          <div className="px-6 py-4 border-b border-orange-200">
            <h3 className="text-xl font-bold text-amber-900 text-center">{title}</h3>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
