import React from "react";

const ErrorState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <svg
        className="w-12 h-12 text-red-400 mb-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-gray-500 text-sm">
        {message || "Failed to load data. Please try again."}
      </p>
    </div>
  );
};

export default ErrorState;
