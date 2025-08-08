import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  error?: string;
  register: UseFormRegister<T>;
  type: Path<T>;
  className?: string;
  label?: string;
  placeholder: string
  inputType?: HTMLInputTypeAttribute
}

export const FormField = <T extends FieldValues>({
  register,
  error,
  type,
  className,
  label,
  inputType = "text",
  placeholder
}: FormFieldProps<T>) => {

  return (
    <fieldset className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={type.toString()} className="block text-sm font-medium text-amber-800">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={type.toString()}
          type={inputType}
          placeholder={placeholder}
          {...register(type)}
          className={`w-full px-4 py-3 border ${
            error ? 'border-red-500' : label ? 'border-amber-300' : 'border-amber-200'
          } rounded-lg ${label ? 'bg-amber-50' : 'bg-white/90'} text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1 animate-fadeIn">
          {error.toString()}
        </p>
      )}
    </fieldset>
  );
};