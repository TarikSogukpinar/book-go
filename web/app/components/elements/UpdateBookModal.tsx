import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UpdateBookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [bookId, setBookId] = useState<string>("");
  const [bookDetails, setBookDetails] = useState<{
    title: string;
    author: string;
    description: string;
  } | null>(null);
  const [error, setError] = useState<string>("");

  const handleFetchBookDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const token = Cookies.get("JWT");

    if (token) {
      try {
        const response = await axios.get(
          `https://book.tariksogukpinar.dev/api/books/${bookId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setBookDetails(response.data);
        } else {
          setError("Book details could not be provided.");
          toast.error("Book details could not be provided.");
        }
      } catch (err) {
        setError("Book details could not be fetched or an error occurred.");
        toast.error("Book details could not be fetched or an error occurred.");
      }
    } else {
      setError("Please log in.");
      toast.error("Please log in.");
    }
  };

  const handleUpdateBookDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const token = Cookies.get("JWT");

    if (token && bookDetails) {
      try {
        const response = await axios.put(
          `https://book.tariksogukpinar.dev/api/books/${bookId}`,
          {
            title: bookDetails.title,
            author: bookDetails.author,
            description: bookDetails.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          onClose();
          toast.success("Book details updated successfully.");
        } else {
          setError("Book details could not be updated.");
          toast.error("Book details could not be updated.");
        }
      } catch (err) {
        setError("Book details could not be updated or an error occurred.");
        toast.error("Book details could not be updated or an error occurred.");
      }
    } else {
      setError("Please log in.");
      toast.error("Please log in.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Update Book</h2>
        {!bookDetails ? (
          <form
            onSubmit={handleFetchBookDetails}
            className="flex flex-col space-y-4"
          >
            <label
              htmlFor="bookId"
              className="block text-sm font-bold text-gray-700"
            >
              Book ID:
            </label>
            <input
              type="text"
              id="bookId"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className="p-2 border rounded-md border-gray-950"
            />
            <button
              type="submit"
              className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Get Book Details
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleUpdateBookDetails}
            className="flex flex-col space-y-4"
          >
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={bookDetails.title}
              onChange={(e) =>
                setBookDetails((prev) =>
                  prev ? { ...prev, title: e.target.value } : prev
                )
              }
              className="p-2 border rounded-md"
            />
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Author:
            </label>
            <input
              type="text"
              id="author"
              value={bookDetails.author}
              onChange={(e) =>
                setBookDetails((prev) =>
                  prev ? { ...prev, author: e.target.value } : prev
                )
              }
              className="p-2 border rounded-md"
            />
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={bookDetails.description}
              onChange={(e) =>
                setBookDetails((prev) =>
                  prev ? { ...prev, description: e.target.value } : prev
                )
              }
              className="p-2 border rounded-md"
            />
            <button
              type="submit"
              className="bg-gray-950 text-white px-4 py-2 font-bold rounded-md hover:bg-gray-600"
            >
              Update Book
            </button>
          </form>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
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
    </div>
  );
};

export default UpdateBookModal;
