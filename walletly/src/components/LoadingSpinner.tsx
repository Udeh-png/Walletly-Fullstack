import { FaSpinner } from "react-icons/fa6";

export const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-10">
      <FaSpinner className="animate-spin text-primary text-5xl" />
    </div>
  );
};
