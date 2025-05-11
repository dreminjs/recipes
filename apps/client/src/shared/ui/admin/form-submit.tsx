import { FC } from "react";

interface IProps {
    content: string
}

export const FormSubmit: FC<IProps> = ({content}) => {
  return (
    <button
      type="submit"
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
    >
        {content}
    </button>
  );
};
