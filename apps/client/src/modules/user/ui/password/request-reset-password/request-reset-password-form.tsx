import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRequestResetPassword } from '../../..';
import { IRequestResetPasswordForm } from '../../../modal/interface';
import { requestResetPasswordFormSchema } from '../../../modal/schema';
import { Button, FormField } from 'shared';

export const RequestResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestResetPasswordForm>({
    resolver: zodResolver(requestResetPasswordFormSchema),
  });

  const { mutate } = useRequestResetPassword();

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="space-y-6 mx-auto"
      >
        <FormField<IRequestResetPasswordForm>
          error={errors.email?.message}
          register={register}
          type={'email'}
          placeholder={'Email'}
          inputType={'email'}
          className='w-[300px]'
        />
        <Button size="md" type="submit">
          Отправить ссылку для сброса
        </Button>
      </form>
    </>
  );
};
