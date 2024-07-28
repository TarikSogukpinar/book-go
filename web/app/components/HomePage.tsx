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
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isGetModalOpen, setIsGetModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("JWT");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setError("Please log in.");
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("JWT");
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <header className="bg-white shadow flex justify-between items-center px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            <a
              href="https://github.com/your-github-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <FaGithub size="2em" />
            </a>
            <a
              href="https://www.linkedin.com/in/your-linkedin-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <FaLinkedin size="2em" />
            </a>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center mt-4">
            GoLang & Next.js TypeScript Book Application
          </h1>
        </div>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className=" text-black px-4 py-2 rounded-md hover:text-gray-600"
          >
            Logout
          </button>
        )}
      </header>
      <main>
        {isLoggedIn ? (
          <div className="mt-10">
            <div className="flex justify-center mt-10 space-x-4">
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
                List All Books
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
    </div>
  );
}
