"use client";
import React, { useState } from "react";
import axios from "axios";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

type Props = {};

export default function LoginPage({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6060/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.status === "success") {
        // Assuming the JWT token is returned in response.data.token
        document.cookie = `JWT=${response.data.token}; path=/; secure; samesite=strict;`;
        router.push("/");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError("Login failed");
      console.error("Error logging in:", err);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 pt-20 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-10 tracking-tight text-dark">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
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
                placeholder="demo@gmail.com"
              />
              <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark" />
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
                placeholder="1234567"
              />
              <BiLockAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
