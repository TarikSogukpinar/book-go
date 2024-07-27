import React from "react";
import Link from "next/link";

type Props = {};

export default function DocsPage({}: Props) {
  return (
    <div>
      <div className="relative isolate">
        <svg
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          />
        </svg>
        <div
          className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          aria-hidden="true"
        ></div>
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-6xl flex items-center justify-center sm:justify-start">
                  {/* <GrInstall className="mr-2" /> */}
                  Installation Docs
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none text-center sm:text-left">
                  To successfully complete the web panel installation and access
                  the dashboard page, you{" "}
                  <span className="font-bolder">
                    must be using MariaDB (MySQL) on your FiveM Server.
                  </span>{" "}
                  This panel only supports Latest framework of QbCore.
                  <br />
                  <small className="font-bold">Latest version 1.0.0</small>
                </p>

                <ol className="relative border-s border-white dark:border-gray-950 mt-10 pr-5">
                  <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3 ring-8">
                      {/* <GrInstall /> */}
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      Flowbite Application UI v2.0.0{" "}
                    </h3>
                    <time className="block mb-2 text-sm font-bold leading-none text-gray-900 dark:text-gray-950">
                      Step 1
                    </time>
                    <p className="mb-4 text-base font-normal text-gray-950 dark:text-gray-950">
                      First of all, in order to successfully create the Web
                      panel, you need to open a remote session with Mariadb
                      during installation.{" "}
                      <Link
                        href={
                          "https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.4.2&os=windows&cpu=x86_64&pkg=msi&mirror=kku"
                        }
                        target="_blank"
                        className="font-bold hover:text-gray-600"
                      >
                        To download Mariadb (for Windows OS)
                      </Link>
                    </p>
                    {/* <Image
                      src="/assets/set-password-mariadb.png"
                      alt="Large Responsive Image"
                      className="w-full rounded-xl bg-gray-900/5 object-cover shadow-lg subpixel-antialiased transition-all duration-300 ease-in-out transform group-hover:translate-y-[-5px] group-hover:opacity-20"
                      width={1920}
                      height={1080}
                    /> */}
                    <p className="mt-5 mb-5 text-base font-normal text-gray-950 dark:text-gray-950">
                      In order to avoid problems when logging in remotely, make
                      sure that your settings are like this, you can also check
                      your port configuration.
                    </p>
                    {/* <Image
                      src="/assets/setting-port-engine-mariadb.png"
                      alt="Large Responsive Image"
                      className="w-full rounded-xl bg-gray-900/5 object-cover shadow-lg subpixel-antialiased transition-all duration-300 ease-in-out transform group-hover:translate-y-[-5px] group-hover:opacity-20"
                      width={1920}
                      height={1080}
                    /> */}

                    <p className="mt-5 mb-5 text-base font-bold text-gray-950 dark:text-gray-950 hover:text-gray-600">
                      <Link
                        target="_blank"
                        href={
                          "https://www.fivemturk.com/threads/mariadb-kullanimi.30069/"
                        }
                      >
                        Installation Example Reference Link{" "}
                      </Link>
                    </p>
                  </li>
                  <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3 ring-8">
                      {/* <GrConfigure /> */}
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      Flowbite Application UI v2.0.0{" "}
                    </h3>
                    <time className="block mb-2 text-sm font-bold leading-none text-gray-900 dark:text-gray-950">
                      Step 2
                    </time>
                    <p className="mb-4 text-base font-normal text-gray-950 dark:text-gray-950">
                      After completing the mariadb process, go to the
                      <Link
                        className="font-bold"
                        target="_blank"
                        href={"/dashboard"}
                      >
                        {" "}
                        Dashboard
                      </Link>{" "}
                      link and enter your database information correctly on this
                      screen.
                    </p>
                    {/* <Image
                      src="/assets/update-database-settings.png"
                      alt="Large Responsive Image"
                      className="w-full rounded-xl bg-gray-900/5 object-cover shadow-lg subpixel-antialiased transition-all duration-300 ease-in-out transform group-hover:translate-y-[-5px] group-hover:opacity-20"
                      width={1920}
                      height={1080}
                    /> */}
                    <br />
                    <p className="mb-4 font-bold">Example Configuration</p>
                    <span className="mb-4">
                      <ul>
                        <li>Host: Your Server Ip Address (e.g 127.0.0.1)</li>
                        <li>Port: Your Server Port (Default 3306)</li>
                        <li>
                          Database Name: Your Server Database Name (e.g
                          igniter-server)
                        </li>
                        <li>
                          Database User Name: Your Server Database User Name
                          (e.g root,ledun)
                        </li>
                        <li>
                          Database Password: Your Server Database Password
                        </li>
                      </ul>
                    </span>
                    <br />
                    {/* <Image
                      src="/assets/update-database-screen.png"
                      alt="Large Responsive Image"
                      className="w-full rounded-xl bg-gray-900/5 object-cover shadow-lg subpixel-antialiased transition-all duration-300 ease-in-out transform group-hover:translate-y-[-5px] group-hover:opacity-20"
                      width={1920}
                      height={1080}
                    /> */}
                  </li>
                  <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3 ring-8">
                      {/* <MdDoneOutline /> */}
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      Flowbite Application UI v2.0.0{" "}
                    </h3>
                    <time className="block mb-2 text-sm font-bold leading-none text-gray-900 dark:text-gray-950">
                      Step 3
                    </time>
                    <p className="mb-4 text-base font-normal text-gray-950 dark:text-gray-950">
                      If you have done all the steps correctly, your Database
                      that you have already installed with HeidiSQL will be
                      listed successfully on the panel. Please make sure your
                      database structure is compatible with{" "}
                      <Link
                        target="_blank"
                        className="font-bold"
                        href={
                          "https://raw.githubusercontent.com/zaphosting/qbcore/main/qbcore.sql"
                        }
                      >
                        Qbcore SQL Example.
                      </Link>
                    </p>
                  </li>
                  <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3 ring-8">
                      {/* <FaLink /> */}
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      Flowbite Application UI v2.0.0{" "}
                    </h3>
                    <time className="block mb-2 text-sm font-bold leading-none text-gray-900 dark:text-gray-950">
                      Reference & Link
                    </time>
                    <p className="mb-4 text-base font-normal text-gray-950 dark:text-gray-950">
                      You can check all links and references for the
                      installation
                    </p>
                    <span className="mb-4">
                      <ul>
                        <li>
                          {" "}
                          <Link
                            target="_blank"
                            href={
                              "https://www.fivemturk.com/threads/mariadb-kullanimi.30069/"
                            }
                          >
                            Example Installation For MariaDB{" "}
                          </Link>
                        </li>
                        <li>
                          {" "}
                          <Link
                            target="_blank"
                            href={
                              "https://docs.qbcore.org/qbcore-documentation/guides/windows-installation"
                            }
                          >
                            Qbcore Docs for basic server installation (Windows
                            OS){" "}
                          </Link>
                        </li>
                        <br />

                        <time className="block mb-2 text-sm font-bold leading-none text-gray-900 dark:text-gray-950">
                          Support Link
                        </time>
                        <p className="mb-4 text-base font-normal text-gray-950 dark:text-gray-950">
                          You can contact the team by opening a ticket via
                          Discord.
                        </p>
                        <li>
                          {" "}
                          <Link
                            target="_blank"
                            href={"https://discord.gg/WdEKMwV4F7"}
                          >
                            Discord{" "}
                          </Link>
                        </li>
                        <li>
                          {" "}
                          <Link
                            target="_blank"
                            href={
                              "https://www.fivemturk.com/threads/mariadb-kullanimi.30069/"
                            }
                          >
                            Tebex{" "}
                          </Link>
                        </li>
                        {/* <li>
                      {" "}
                      <Link
                        target="_blank"
                        href={
                          "https://www.fivemturk.com/threads/mariadb-kullanimi.30069/"
                        }
                      >
                        Example Config For MariaDB{" "}
                      </Link>
                    </li> */}
                      </ul>
                    </span>
                  </li>
                </ol>
              </div>
              {/* <div className="mt-14 flex justify-center lg:mt-0 lg:justify-end">
            <div className="relative w-full max-w-6xl">
              <Image
                src="/assets/gta3.jpg"
                alt="Large Responsive Image"
                className="w-fit rounded-xl bg-gray-900/5 object-cover shadow-lg subpixel-antialiased transition-all duration-300 ease-in-out transform group-hover:translate-y-[-5px] group-hover:opacity-20"
                width={480}
                height={720}
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
            </div>
          </div> */}
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-black">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <p className="mt-10 text-center text-xs leading-5 text-gray-500 font-bold">
            @2024 Book-go. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
