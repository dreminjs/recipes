

import { SignUpForm } from '@/widgets/signup';
export const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="text-[35px] px-10 py-8 rounded bg-slate-400 w-[500px]">
        <h3 className='text-white p-0 m-0'>Регистрация</h3>
        <SignUpForm />
      </div>
    </div>
  );
};
