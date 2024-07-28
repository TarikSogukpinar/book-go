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
        `http://localhost:6060/api/books/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Kitap başarıyla silindi!");
        onClose();
      } else {
        setError("Kitap silinemedi!");
      }
    } catch (err) {
      setError("Kitap silinemedi!");
      console.error("Error deleting book:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Kitap Sil
                </h3>
                <div className="mt-2">
                  {error && <p className="text-red-500">{error}</p>}
                  <form onSubmit={handleDeleteBook}>
                    <div>
                      <label
                        htmlFor="bookId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Kitap ID
                      </label>
                      <div className="mt-1">
                        <input
                          id="bookId"
                          name="bookId"
                          type="text"
                          value={bookId}
                          onChange={(e) => setBookId(e.target.value)}
                          required
                          className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                      >
                        Kitabı Sil
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              İptal
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
