import { FC } from "react";

interface IProps {
    content: string
}

export const AuthTitle: FC<IProps> = ({content}) => {
    return (
      <div className="bg-gradient-to-l from-amber-500 to-orange-500 p-6">
        <h3 className="text-3xl font-bold text-white m-0">{content}</h3>
      </div>
    );
  };
  