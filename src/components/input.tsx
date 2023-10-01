interface InputProps {
  type: string;
  placeholder?: string;
}

export const Input = ({ type, placeholder }: InputProps): JSX.Element => {
  return (
    <input
      className="w-full px-4 py-2 border-[1px] border-slate-300 rounded-xl"
      type={type}
      placeholder={placeholder}
    />
  );
};
