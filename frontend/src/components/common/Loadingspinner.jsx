const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        <div className="mt-4 text-center text-gray-600">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
