import React from "react";
import Link from "next/link";

type Props = {};

export default function HomePage({}: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Go Lang Fiber & Next.js TypeScript Book Application
      </h1>
      <ul className="flex flex-col items-center space-y-4 mt-10">
        <li>
          <Link href="/login" className="text-blue-500 hover:underline text-xl">
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
          <Link href="/docs" className="text-blue-500 hover:underline text-xl">
            Docs
          </Link>
        </li>
      </ul>
    </div>
  );
}
