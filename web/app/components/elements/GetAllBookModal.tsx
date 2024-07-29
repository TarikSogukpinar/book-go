import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

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
  const [booksPerPage] = useState<number>(2); // Change this value to change the number of books per page
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editBook, setEditBook] = useState<any>(null);

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
        toast.error("Failed to fetch books or an error occurred");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Token not found. Please login.");
      toast.error("Token not found. Please login.");
      setLoading(false);
    }
  };

  const searchBooks = async () => {
    if (searchQuery.length < 5) {
      setError("Search query must be at least 5 characters long.");
      toast.error("Search query must be at least 5 characters long.");
      return;
    }

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
        toast.error("Failed to search books or an error occurred");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Token not found. Please login.");
      toast.error("Token not found. Please login.");
      setLoading(false);
    }
  };

  const handleEdit = (book: any) => {
    setEditBook(book);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    const token = Cookies.get("JWT");

    if (token) {
      try {
        await axios.delete(`https://book.tariksogukpinar.dev/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        toast.success("Book deleted successfully!");
      } catch (err) {
        setError("Failed to delete the book or an error occurred");
        toast.error("Failed to delete the book or an error occurred");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Token not found. Please login.");
      toast.error("Token not found. Please login.");
      setLoading(false);
    }
  };

  const handleEditSave = async () => {
    if (!editBook) return;
    setLoading(true);
    const token = Cookies.get("JWT");

    if (token) {
      try {
        await axios.put(
          `https://book.tariksogukpinar.dev/api/books/${editBook.id}`,
          editBook,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book.id === editBook.id ? editBook : book))
        );
        setEditBook(null);
        toast.success("Book updated successfully!");
      } catch (err) {
        setError("Failed to update the book or an error occurred");
        toast.error("Failed to update the book or an error occurred");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Token not found. Please login.");
      toast.error("Token not found. Please login.");
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
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-3xl mx-auto">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Search Books</h2>
            <input
              type="text"
              placeholder="Search by book database..."
              className="p-2 border rounded-md w-full mb-4 border-gray-950"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-2"
              onClick={searchBooks}
            >
              Search
            </button>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            <h2 className="text-2xl font-bold mb-4 mt-2">All Books</h2>
            <p className="mb-4">Total Books: {totalBooks}</p>
            {books && books.length > 0 ? (
              <ul className="space-y-2">
                {books.map((book) => (
                  <li
                    key={book.id}
                    className="border-b border-gray-300 py-2 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">Book ID: {book.id}</p>
                      <p className="font-semibold">Title: {book.title}</p>
                      <p className="font-semibold">Author: {book.author}</p>
                      <p className="font-semibold">
                        Description:{" "}
                        {book.description.length > 50
                          ? `${book.description.slice(0, 100)}...`
                          : book.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </div>
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
      {editBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
            <input
              type="text"
              placeholder="Title"
              className="p-2 border rounded-md w-full mb-4 border-gray-950"
              value={editBook.title}
              onChange={(e) =>
                setEditBook({ ...editBook, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Author"
              className="p-2 border rounded-md w-full mb-4 border-gray-950"
              value={editBook.author}
              onChange={(e) =>
                setEditBook({ ...editBook, author: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="p-4 border rounded-md w-full mb-4 border-gray-950"
              value={editBook.description}
              onChange={(e) =>
                setEditBook({ ...editBook, description: e.target.value })
              }
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={() => setEditBook(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllBookModal;
