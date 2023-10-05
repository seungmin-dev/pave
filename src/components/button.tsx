interface IButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children: string;
  [key: string]: any;
}

export const Button = ({ type, children, ...rest }: IButtonProps) => {
  return (
    <button
      {...rest}
      className="w-full px-4 py-3 my-4 bg-black tracking-wider text-white text-center rounded-xl font-bold cursor-pointer hover:bg-slate-900"
      type={type}
    >
      {children}
    </button>
  );
};
