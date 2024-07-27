import React from "react";

type Props = {};

export default function RegisterPage({}: Props) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 pt-20 lg:px-8  ">
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm  ">
        <h2 className="mt-10 text-center text-3xl font-bold leading-10 tracking-tight text-dark">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="flex justify-center font-bold">
          {/* <GiHammerDrop className="mr-2" /> Dashboard Development For a While */}
        </p>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-dark"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                // onChange={}
                // value={}
                required
                className="block w-full rounded-md border-0 bg-dark/5 py-1.5 text-dark shadow-sm ring-1 ring-inset ring-dark/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-dark"
              >
                Password
              </label>
              {/* <div className="text-sm">
        <a
          href="#"
          className="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Forgot password?
        </a>
      </div> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                // onChange={handleLogin}
                // value={loginValues.password}
                placeholder="12345#!"
                className="block w-full rounded-md border-0 bg-dark/5 py-1.5 text-dark shadow-sm ring-1 ring-inset ring-dark/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
