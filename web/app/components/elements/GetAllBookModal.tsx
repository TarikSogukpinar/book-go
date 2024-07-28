import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const GetAllBookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [booksPerPage] = useState<number>(5); // You can change the number of books per page

  useEffect(() => {
    const fetchBooks = async () => {
      setError("");
      const token = Cookies.get("JWT");

      if (token) {
        try {
          const response = await axios.get(`https://book.tariksogukpinar.dev/api/books`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              limit: booksPerPage,
            },
          });

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
        }
      } else {
        setError("Token not found. Please login.");
      }
    };

    if (isOpen) {
      fetchBooks();
    }
  }, [isOpen, currentPage, booksPerPage]);

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md w-3/4 max-h-3/4 overflow-y-auto">
        <h2 className="text-xl font-bold">All Books</h2>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <p className="mt-4">Total Books: {totalBooks}</p>
        {books && books.length > 0 ? (
          <ul className="mt-4">
            {books.map((book) => (
              <li key={book.id} className="border-b border-gray-300 py-2">
                <p>ID: {book.id}</p>
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                {/* Display other book details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">No books found.</p>
        )}
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
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

export default GetAllBookModal;
