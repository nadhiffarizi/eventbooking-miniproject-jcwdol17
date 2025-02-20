import { useState } from "react";

const FeedbackForm: React.FC<{ hasPurchased: boolean }> = ({
  hasPurchased,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleRating = (value: number) => {
    setRating(value);
  };

  if (!hasPurchased) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-700">
          You need to complete a purchase before leaving feedback.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 shadow-sm justify-center items-center ml-auto mr-auto bg-[#23395d] w-1/2 text-white rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800">
      <div className="flex flex-col items-center w-full">
        <h2 className="text-3xl font-semibold text-center">
          Your opinion matters!
        </h2>
        <div className="flex flex-col items-center py-6 space-y-3">
          <span className="text-center">How was your experience?</span>
          <div className="flex space-x-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                title={`Rate ${star} stars`}
                aria-label={`Rate ${star} stars`}
                onClick={() => handleRating(star)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill={rating && rating >= star ? "#D97706" : "#D1D5DB"}
                  className="w-10 h-10"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <textarea
            rows={3}
            placeholder="Message..."
            className="p-4 rounded-md resize-none text-black dark:text-gray-800 dark:bg-gray-50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className="py-4 my-8 font-semibold rounded-md dark:text-gray-50 dark:bg-violet-600"
          >
            Leave feedback
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <a
          rel="noopener noreferrer"
          href="#"
          className="text-sm dark:text-gray-600"
        >
          Maybe later
        </a>
      </div>
    </div>
  );
};
const App = () => {
  const [hasPurchased, setHasPurchased] = useState<boolean>(true); // Ubah sesuai kondisi nyata

  return <FeedbackForm hasPurchased={hasPurchased} />;
};

export default App;
