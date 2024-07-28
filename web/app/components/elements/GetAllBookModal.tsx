import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
  </div>
);

const GetAllBookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [booksPerPage] = useState<number>(5); // Change this value to change the number of books per page
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchBooks = async () => {
    setError("");
    setLoading(true);
    const token = Cookies.get("JWT");

    if (token) {
      try {
        const response = await axios.get(
          `https://book.tariksogukpinar.dev/api/books`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              limit: booksPerPage,
            },
          }
        );

        if (
          response.data &&
          response.data.books &&
          response.data.total !== undefined
        ) {
          setBooks(response.data.books);
          setTotalBooks(response.data.total);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        setError("Failed to fetch books or an error occurred");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Token not found. Please login.");
      setLoading(false);
    }
  };

  const searchBooks = async () => {
    setError("");
    setLoading(true);
    const token = Cookies.get("JWT");

    if (token) {
      try {
        const response = await axios.get(
          `https://book.tariksogukpinar.dev/api/books/search`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              q: searchQuery,
            },
          }
        );

        if (response.data && response.data.books !== undefined) {
          setBooks(response.data.books);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        setError("Failed to search books or an error occurred");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Token not found. Please login.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBooks();
    }
  }, [isOpen, currentPage, booksPerPage]);

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-3xl mx-auto">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">All Books</h2>
            <input
              type="text"
              placeholder="Search by title..."
              className="p-2 border rounded-md w-full mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
              onClick={searchBooks}
            >
              Search
            </button>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            <p className="mb-4">Total Books: {totalBooks}</p>
            {books && books.length > 0 ? (
              <ul className="space-y-2">
                {books.map((book) => (
                  <li key={book.id} className="border-b border-gray-300 py-2">
                    <p className="font-semibold">Book ID: {book.id}</p>
                    <p className="font-semibold">Title: {book.title}</p>
                    <p className="font-semibold">Author: {book.author}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No books found.</p>
            )}
            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GetAllBookModal;
