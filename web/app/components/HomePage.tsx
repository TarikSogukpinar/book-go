"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import BookModal from "./elements/AddBookModal";
import GetAllBookModal from "./elements/GetAllBookModal";
import UpdateBookModal from "./elements/UpdateBookModal";
import DeleteBookModal from "./elements/DeleteBookModal";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import axios from "axios";

type Props = {};

export default function HomePage({}: Props) {
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isGetModalOpen, setIsGetModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("JWT");
    const email = Cookies.get("userEmail") || null;

    if (token) {
      setIsLoggedIn(true);
      setUserEmail(email);
    } else {
      setIsLoggedIn(false);
      setError("Please log in.");
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    Cookies.remove("JWT");
    Cookies.remove("userEmail");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openGetModal = () => {
    setIsGetModalOpen(true);
  };

  const closeGetModal = () => {
    setIsGetModalOpen(false);
  };

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const fetchBooks = async () => {
    const token = Cookies.get("JWT");

    if (token) {
      try {
        const response = await axios.get(
          `https://book.tariksogukpinar.dev/api/books`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooks(response.data.books);
      } catch (err) {
        setError("Books could not be fetched.");
      }
    } else {
      setError("Token not found. Please log in.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-950 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <header className="bg-white shadow flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center justify-center md:items-start">
          <h1 className="text-4xl font-bold text-gray-900 text-center md:text-left mt-4 md:mt-0 mb-16 ml-10">
            Golang & Next.js Book Application
          </h1>
        </div>
        {isLoggedIn && (
          <div className="flex flex-col items-center md:items-end mt-14 md:mt-0">
            <button
              onClick={handleLogout}
              className="text-black rounded-md hover:text-gray-600"
            >
              Logout
            </button>
            {userEmail && (
              <span className="flex text-xs text-gray-500 mt-1 opacity-75 mb-5 md:mb-0">
                ( {userEmail} )
              </span>
            )}
          </div>
        )}
      </header>
      <main>
        {isLoggedIn ? (
          <div className="mt-10">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mt-10 space-y-4 md:space-y-0 md:space-x-4">
              <button
                className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={openAddModal}
              >
                Add Book
              </button>
              <button
                className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => {
                  openGetModal();
                  fetchBooks();
                }}
              >
                List Books
              </button>
              <button
                className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={openUpdateModal}
              >
                Update Book
              </button>
              <button
                className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={openDeleteModal}
              >
                Delete Book
              </button>
            </div>
            <BookModal isOpen={isAddModalOpen} onClose={closeAddModal} />
            <GetAllBookModal isOpen={isGetModalOpen} onClose={closeGetModal} />
            <UpdateBookModal
              isOpen={isUpdateModalOpen}
              onClose={closeUpdateModal}
            />
            <DeleteBookModal
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4 mt-10">
            <div className="flex space-x-4">
              <Link href="/login">
                <button className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                  Register
                </button>
              </Link>
              <Link href="/docs">
                <button className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                  Docs
                </button>
              </Link>
            </div>
          </div>
        )}
        {error && !isLoggedIn && (
          <p className="text-red-500 text-center mt-10">{error}</p>
        )}
      </main>
      <footer className="flex flex-col items-center mt-10">
        <div className="flex space-x-6 mb-4">
          <a
            href="https://github.com/TarikSogukpinar/book-go"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700"
          >
            <FaGithub size="2em" />
          </a>
          <a
            href="https://www.linkedin.com/in/tarik-sogukpinar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700"
          >
            <FaLinkedin size="2em" />
          </a>
        </div>
      </footer>
    </div>
  );
}
