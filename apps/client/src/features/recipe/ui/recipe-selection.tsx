import { FC } from "react";


interface IProps {
    type: string
    label: string
}

export const RecipeSelection: FC<IProps> = ({type,label}) => {
  return (
    <div>
      <h1>{type}: {label}</h1>
      <ul>

      </ul>
    </div>
  );
}