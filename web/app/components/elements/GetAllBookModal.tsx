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

  useEffect(() => {
    const fetchBooks = async () => {
      setError("");
      const token = Cookies.get("JWT");

      if (token) {
        try {
          const response = await axios.get("http://localhost:6060/api/books", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBooks(response.data);
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
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-xl font-bold">All Books</h2>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {books.length > 0 ? (
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
