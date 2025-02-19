export const Button: React.FC<
  React.PropsWithChildren<{
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
  }>
> = ({ className, type = "button", onClick, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition ${className}`}>
      {children}
    </button>
  );
};
