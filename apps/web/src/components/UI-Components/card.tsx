export const Card: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ className, children }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};
