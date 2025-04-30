import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 focus:outline-none"
    >
      <PlusIcon className="h-6 w-6" />
    </button>
  );
};

export default FloatingActionButton;
