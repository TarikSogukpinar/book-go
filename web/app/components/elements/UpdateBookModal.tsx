import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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
          setError("Kitap detayları getirilemedi.");
        }
      } catch (err) {
        setError("Kitap detayları getirilemedi veya bir hata oluştu.");
      }
    } else {
      setError("Token bulunamadı. Lütfen giriş yapın.");
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
        } else {
          setError("Kitap detayları güncellenemedi.");
        }
      } catch (err) {
        setError("Kitap detayları güncellenemedi veya bir hata oluştu.");
      }
    } else {
      setError("Token bulunamadı. Lütfen giriş yapın.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md w-3/4 max-h-3/4 overflow-y-auto">
        <h2 className="text-xl font-bold">Kitap Güncelle</h2>
        {!bookDetails ? (
          <form onSubmit={handleFetchBookDetails} className="flex flex-col">
            <label htmlFor="bookId" className="mt-2">
              Kitap ID:
            </label>
            <input
              type="text"
              id="bookId"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className="p-2 border rounded-md mt-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Kitap Detaylarını Getir
            </button>
          </form>
        ) : (
          <form onSubmit={handleUpdateBookDetails} className="flex flex-col">
            <label htmlFor="title" className="mt-2">
              Başlık:
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
              className="p-2 border rounded-md mt-2"
            />
            <label htmlFor="author" className="mt-2">
              Yazar:
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
              className="p-2 border rounded-md mt-2"
            />
            <label htmlFor="description" className="mt-2">
              Açıklama:
            </label>
            <textarea
              id="description"
              value={bookDetails.description}
              onChange={(e) =>
                setBookDetails((prev) =>
                  prev ? { ...prev, description: e.target.value } : prev
                )
              }
              className="p-2 border rounded-md mt-2"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Kitap Güncelle
            </button>
          </form>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={onClose}
        >
          Kapat
        </button>
      </div>
    </div>
  );
};

export default UpdateBookModal;
