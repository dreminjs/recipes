import { UseFormRegister, FieldValues } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  error?: string;
  register: UseFormRegister<T>;
  type: keyof T;
  className?: string;
  label?: string;
}

export const FormField = <T extends FieldValues>({
  register,
  error,
  type,
  className,
  label,
}: FormFieldProps<T>) => {
//   const placeholderMap: Partial<Record<keyof T, string>> = {
//     email: 'Email',
//     nickname: 'Имя пользователя',
//     password: 'Пароль',
//     // Можно расширить для других типов полей
//   };

    // TODO: intergrate to forms where is possible
  // const inputType = type === 'password' ? 'password' : 'text';

  return (
    <div className={`space-y-2 mb-2 ${className}`}>
      {label && (
        <label htmlFor={type.toString()} className="block text-sm font-medium text-amber-800">
          {label}
        </label>
      )}
      <div className="relative">
        {/* <input
          id={type.toString()}
          type={inputType}
          {...register(type)}
          placeholder={placeholderMap[type] || ''}
          className={`w-full px-4 py-3 border ${
            error ? 'border-red-500' : label ? 'border-amber-300' : 'border-amber-200'
          } rounded-lg ${label ? 'bg-amber-50' : 'bg-white/90'} text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
        /> */}
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1 animate-fadeIn">
          {error.toString()}
        </p>
      )}
    </div>
  );
};