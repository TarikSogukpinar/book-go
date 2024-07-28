import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

type DeleteBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DeleteBookModal({
  isOpen,
  onClose,
}: DeleteBookModalProps) {
  const [bookId, setBookId] = useState("");
  const [error, setError] = useState("");

  const handleDeleteBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("JWT");
    try {
      const response = await axios.delete(
        `https://book.tariksogukpinar.dev/api/books/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Book deleted successfully!");
        onClose();
      } else {
        setError("The book could not be deleted!");
      }
    } catch (err) {
      setError("The book could not be deleted!");
      console.error("Error deleting book:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Delete Book</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleDeleteBook} className="flex flex-col space-y-4">
          <label
            htmlFor="bookId"
            className="block text-sm font-medium text-gray-700"
          >
            Book ID
          </label>
          <input
            id="bookId"
            name="bookId"
            type="text"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
            className="p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete Book
          </button>
        </form>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
