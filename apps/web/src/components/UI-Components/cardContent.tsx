export const CardContent: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ className, children }) => {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
};
