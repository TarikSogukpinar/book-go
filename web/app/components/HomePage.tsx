"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import BookModal from "./elements/AddBookModal";
import GetAllBookModal from "./elements/GetAllBookModal";
import UpdateBookModal from "./elements/UpdateBookModal";
import axios from "axios";
import DeleteBookModal from "./elements/DeleteBookModal";

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

  const fetchBooks = async () => {
    const token = Cookies.get("JWT");

    if (token) {
      try {
        const response = await axios.get("http://localhost:6060/api/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data.books);
      } catch (err) {
        setError("Kitaplar getirilemedi.");
      }
    } else {
      setError("Token bulunamadı. Lütfen giriş yapın.");
    }
  };

  useEffect(() => {
    const token = Cookies.get("JWT");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setError("Lütfen giriş yapın.");
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
    fetchBooks(); // Kitapları butona tıklayınca getir
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

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-3xl font-bold">
          Go Lang Fiber & Next.js TypeScript Kitap Uygulaması
        </h1>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md ml-3"
          >
            Çıkış Yap
          </button>
        )}
      </div>
      {isLoggedIn ? (
        <div className="mt-10">
          {books.length > 0 && (
            <div className="flex justify-center">
              <ul className="w-1/2">
                {books.map((book) => (
                  <li key={book.id} className="border-b border-gray-300 py-2">
                    {book.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex justify-center mt-10 space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={openAddModal}
            >
              Kitap Ekle
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={openGetModal}
            >
              Kitap Getir
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              onClick={openUpdateModal}
            >
              Kitap Güncelle
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={openDeleteModal}
            >
              Kitap Sil
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
        <ul className="flex flex-col items-center space-y-4 mt-10">
          <li>
            <Link
              href="/login"
              className="text-blue-500 hover:underline text-xl"
            >
              Giriş Yap
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="text-blue-500 hover:underline text-xl"
            >
              Kayıt Ol
            </Link>
          </li>
          <li>
            <Link
              href="/docs"
              className="text-blue-500 hover:underline text-xl"
            >
              Belgeler
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
