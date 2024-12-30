import { SignInForm } from '../../../widgets/signin';

export const SignInPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="text-[35px] px-10 py-8 rounded bg-slate-400 w-[500px]">
        <h3 className='text-white m-0 p-0'>Вход</h3>
        <SignInForm />
      </div>
    </div>
  );
};
