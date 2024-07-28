// UpdateBookModal.tsx
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UpdateBookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-xl font-bold">Update Book</h2>
        {/* Add your form elements here */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateBookModal;
