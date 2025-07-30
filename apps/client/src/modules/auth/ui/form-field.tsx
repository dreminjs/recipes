import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

interface IProps<T extends FieldValues> {
  error?: string
  register: UseFormRegister<T>;
  type: Path<T>
  className?: string;
  placeholder: string
}

export const FormField= <T extends FieldValues,>({
  register,
  error,
  type,
  className,
  placeholder
}: IProps<T>) => {
    return (
      <fieldset className={`mb-4 ${className}`}>
        <input
          placeholder={placeholder}
          {...register(type)}
          type={type === 'password' ? 'password' : 'text'}
          className={`w-full px-4 py-3 text-lg bg-white/90 rounded-lg border ${error ? 'border-red-500' : 'border-amber-200'} focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`} />
        {error && (
          <p className="mt-1 text-red-600 text-sm font-medium animate-fadeIn">
            {error.toString()}
          </p>
        )}
      </fieldset>
    );
  };
