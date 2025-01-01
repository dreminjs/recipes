import { Prisma } from 'prisma/prisma-client';
import { FC, useEffect, useRef, useState } from 'react';

interface IProps {
  title: string;
  id: string;
  onDelete: (id: string) => void;
  currentIdx: number;
  visibleIdx: number | null;
  isVisible: boolean;
  onPut(data: Prisma.TypeUpdateInput, id: string): void;
  onShowInput: (idx: number) => void;
  onHideInput: () => void;
}

export const AdminCharacteristicItem: FC<IProps> = ({
  title,
  id,
  onDelete,
  currentIdx,
  visibleIdx,
  isVisible,
  onPut,
  onShowInput,
  onHideInput,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [text, setText] = useState<string>('');

  useEffect(() => {
    setText(title);
  }, [title]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onHideInput();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentIdx, onHideInput]);

  return (
    <li className="p-5 border-2 mb-5 rounded-xl flex justify-between items-center">
      <div>
        {isVisible && currentIdx === visibleIdx ? (
          <div id="input" className="flex gap-5">
            <input
              value={text}
              type="text"
              ref={inputRef}
              onChange={(e) => setText(e.target.value)}
              className="text-[25px] p-0 m-0 outline-none border-b-2 w-[50%]"
            />
            <button
              ref={buttonRef}
              onClick={() => onPut({ title: text }, id)}
              className="text-[25px] px-5 py-2 rounded-xl"
            >
              Save
            </button>
          </div>
        ) : (
          <p
            onClick={() => onShowInput(currentIdx)}
            className="text-[25px] p-0 m-0"
          >
            {title}
          </p>
        )}
        <p className="text-[25px] p-0 m-0">id: {id}</p>
      </div>
      <div>
        <button
          onClick={() => onDelete(id)}
          className="text-[25px] text-[red] px-5 py-2 border-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </li>
  );
};
