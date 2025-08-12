import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { FC } from 'react';

interface IProps {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  choosed: boolean;
  content: string;
  setCombinedRefs?: (node: HTMLDivElement | null) => void;
  onUpdate: () => void;
  onDelete: () => void;
}

export const CharacteristicItemInfo: FC<IProps> = (props) => {
  return (
    <>
      <div
        {...(!props.choosed ? props.attributes : {})}
        {...(!props.choosed ? props.listeners : {})}
        {...(props.setCombinedRefs && { ref: props.setCombinedRefs })}
        className="py-2 px-3 basis-3/4 text-gray-70 w-32"
      >
        {props.content}
      </div>
      <div className="flex justify-evenly basis-1/4">
        <button
          onClick={() => props.onUpdate()}
          className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
        >
          ✏️
        </button>
        <button
          onClick={() => props.onDelete()}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        >
          ❌
        </button>
      </div>
    </>
  );
};
