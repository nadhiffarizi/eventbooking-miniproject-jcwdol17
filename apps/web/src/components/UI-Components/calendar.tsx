export const Calendar: React.FC<{
  placeholder?: string;
  className?: string;
  required?: boolean;
}> = ({ placeholder, className, required }) => {
  return (
    <input
      type="date"
      placeholder={placeholder}
      className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      required={required}
    />
  );
};
