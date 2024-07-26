import { Link } from "react-router-dom";

const EmptyPages = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
      <h1 className="mb-4 text-6xl font-extrabold text-gray-900 dark:text-white animate-bounce">404</h1>
      <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">Oops! Page not found.</p>
      <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-[#00ADB5] rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Go back to Home
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
      <div className="mt-10">
        <svg
          className="w-16 h-16 animate-spin text-[#00ADB5]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default EmptyPages;
