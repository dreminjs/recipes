import { FC } from "react";

interface IProps {
  title: string;
  children: React.ReactNode;
}


export const ProfileCard: FC<IProps> = ({ title, children } ) => (
  <div className="bg-white rounded-2xl shadow-md p-6 border border-orange-100">
    <h3 className="text-2xl font-bold text-amber-900 mb-4 pb-2 border-b border-orange-200">
      {title}
    </h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);