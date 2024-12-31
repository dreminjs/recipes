import Link from 'next/link';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
export const Header = () => {
  return (
    <header className="border-2 py-5 px-5 mx-auto flex justify-between items-center mb-[40px] rounded-2xl">
      <Link href={'/'} className="text-[32px]">
        Recipes :)
      </Link>
      <div className='flex gap-5 items-center'>
        <Link className='text-[20px]' href={'/recipe/post'}>Добавить рецепт</Link>
        <Link href="/profile">
          <AccountBoxIcon sx={{ fontSize: 50 }} />
        </Link>
      </div>
    </header>
  );
};
