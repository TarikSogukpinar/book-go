"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import BookModal from "./elements/AddBookModal";
// import { getBooks } from "../api/books"; // Kitapları almak için API fonksiyonunu içe aktarın

type Props = {};

export default function HomePage({}: Props) {
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("JWT");

    if (token) {
      setIsLoggedIn(true);
      // getBooks()
      //   .then((data) => setBooks(data))
      //   .catch((err) => setError(err.message));
    } else {
      setIsLoggedIn(false);
      setError("Lütfen giriş yapın");
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("JWT");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-3xl font-bold">
          Go Lang Fiber & Next.js TypeScript Book Application
        </h1>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        )}
      </div>
      {isLoggedIn ? (
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Books</h2>
          <ul>
            {books.map((book) => (
              <li key={book.id} className="border-b border-gray-300 py-2">
                {book.title}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={openModal}
            >
              Add Book
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-4">
              Remove Book
            </button>
          </div>
          <BookModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      ) : (
        <ul className="flex flex-col items-center space-y-4 mt-10">
          <li>
            <Link
              href="/login"
              className="text-blue-500 hover:underline text-xl"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="text-blue-500 hover:underline text-xl"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              href="/docs"
              className="text-blue-500 hover:underline text-xl"
            >
              Docs
            </Link>
          </li>
        </ul>
      )}
      {error && !isLoggedIn && (
        <p className="text-red-500 text-center mt-10">{error}</p>
      )}
    </div>
  );
}
