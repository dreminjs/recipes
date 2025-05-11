import { FC, ReactNode } from "react";

interface IProps {
    children: ReactNode
}

export const Layout: FC<IProps> = ({children}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h3 className="text-3xl font-bold text-amber-900 mb-8">
        Добавить новый рецепт
      </h3>
      <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">{children}</div>
    </div>
  );
};
