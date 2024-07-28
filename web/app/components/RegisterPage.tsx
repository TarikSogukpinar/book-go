"use client";
import React, { useState } from "react";
import axios from "axios";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};

export default function RegisterPage({}: Props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6060/api/auth/register",
        {
          email,
          username,
          password,
        }
      );

      if (response.data.status === "success") {
        toast.success("Kayıt başarılı!");
        router.push("/login");
      } else {
        setError(response.data.message || "Kayıt başarısız");
        toast.error(response.data.message || "Kayıt başarısız");
      }
      
    } catch (err) {
      setError("Kayıt başarısız");
      toast.error("Kayıt başarısız");
      console.error("Kayıt olurken hata:", err);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 pt-20 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-10 tracking-tight text-dark">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-dark"
            >
              Email
            </label>
            <div className="mt-2 relative">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 bg-dark/5 py-1.5 text-dark shadow-sm ring-1 ring-inset ring-dark/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 pl-10"
                placeholder="example@gmail.com"
              />
              <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark" />
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-dark"
            >
              Username
            </label>
            <div className="mt-2 relative">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-md border-0 bg-dark/5 py-1.5 text-dark shadow-sm ring-1 ring-inset ring-dark/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 pl-10"
                placeholder="Kullanıcı adınız"
              />
              <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark" />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-dark"
            >
              Password
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 bg-dark/5 py-1.5 text-dark shadow-sm ring-1 ring-inset ring-dark/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 pl-10"
                placeholder="12345#!"
              />
              <BiLockAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}