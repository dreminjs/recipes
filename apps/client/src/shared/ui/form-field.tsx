
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

type FormFieldProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  error?: string;
  type: Path<T>;
  className?: string;
  label?: string;
  inputType?: string;
  placeholder?: string;
  variant?: "default" | "orange";
};

export const FormField = <T extends FieldValues>({
  register,
  error,
  type,
  className,
  label,
  inputType = "text",
  placeholder,
  variant = "orange",
}: FormFieldProps<T>) => {

  const variants = {
    default: {
      label: "text-gray-700",
      inputBorder: error ? "border-red-500" : label ? "border-gray-300" : "border-gray-200",
      inputBg: label ? "bg-gray-50" : "bg-white/90",
      inputText: "text-gray-900",
      placeholder: "placeholder-gray-400",
      focus: "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    },
    orange: {
      label: "text-amber-800",
      inputBorder: error ? "border-red-500" : label ? "border-amber-300" : "border-amber-200",
      inputBg: label ? "bg-amber-50" : "bg-white/90",
      inputText: "text-amber-900",
      placeholder: "placeholder-amber-400",
      focus: "focus:ring-2 focus:ring-amber-500 focus:border-transparent",
    },
  };

  const currentVariant = variants[variant];

  return (
    <fieldset className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={type.toString()} className={`block text-sm font-medium ${currentVariant.label}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={type.toString()}
          type={inputType}
          placeholder={placeholder}
          {...register(type, {
            valueAsNumber: inputType === "number"
          })}
          className={`w-full px-4 py-3 border outline-none rounded-lg ${currentVariant.inputBorder} ${currentVariant.inputBg} ${currentVariant.inputText} ${currentVariant.placeholder} ${currentVariant.focus}`}
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