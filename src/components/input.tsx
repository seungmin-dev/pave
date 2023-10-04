import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
}

export const Input = ({
  type,
  placeholder,
  register,
  required,
}: InputProps): JSX.Element => {
  return (
    <input
      className="w-full px-4 py-2 my-2 border-[1px] border-slate-300 rounded-xl dark:bg-zinc-200"
      type={type}
      placeholder={placeholder}
      {...register}
      required={required}
    />
  );
};
