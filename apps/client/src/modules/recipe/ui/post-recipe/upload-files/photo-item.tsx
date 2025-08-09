import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { FC } from 'react';

interface IProps {
  id: string;
  preview: string;
  removeImage: (id: string) => void;
}

export const PhotoItem: FC<IProps> = ({ id, preview, removeImage }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
    >
      <div {...listeners} className="absolute inset-0 cursor-move z-10" />
      <Image
        src={preview}
        alt={`Превью рецепта`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      />
      <button
        type="button"
        onClick={() => removeImage(id)}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-[25px] w-[25px] opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        X
      </button>
    </div>
  );
};
