export const Textarea: React.FC<{
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ placeholder, className, value, onChange }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-lg p-2 w-full h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}></textarea>
  );
};
