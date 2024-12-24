import React from 'react';

interface errorType {
  err: string;
}

const ErrorComponent: React.FC<errorType> = ({ err }) => {
  return (
    <p className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md flex items-center mt-4">
      {err}
    </p>
  );
};

export default ErrorComponent;
