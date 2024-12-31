import { AdminLink } from '../../../../entities/admin/';

export const AdminLinksList = () => {
  return (
    <ul className="border-2 flex list-none gap-5 p-5 rounded-xl flex-wrap justify-center">
      <AdminLink content="Управление рецептами" href="admin/recipe" />
      <AdminLink content="Управление пользователями" href="admin/users" />
      <AdminLink content="Управление ингредиентами" href="admin/ingredients" />
      <AdminLink content="Управление типами" href="admin/types" />
      <AdminLink
        content="Управление национальными кухнями"
        href="admin/national-cuisines"
      />
      <AdminLink content="Управление праздниками" href="admin/holidays" />
    </ul>
  );
};
