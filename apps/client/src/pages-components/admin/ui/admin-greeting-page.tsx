import { AdminLinksList } from '../../../features/admin';

export const AdminGreetingPage = () => {
  return (
    <div>
      <div className='mx-auto w-[80%]'>
        <h3 className="text-3xl">Добро пожаловать в Админ Панель!</h3>
        <AdminLinksList />
      </div>
    </div>
  );
};
