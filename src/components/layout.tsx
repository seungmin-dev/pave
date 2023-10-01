import Link from "next/link";
import { useRouter } from "next/router";
import { cls } from "../library/unil";
import { useEffect, useState } from "react";

interface ILayoutProps {
  title: string;
  children: React.ReactNode;
}

const MENU = [
  {
    name: "home",
    page: "/",
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  },
  {
    name: "search",
    page: "/search",
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  },
  {
    name: "new",
    page: "/new",
    icon: "M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z",
  },
  {
    name: "collection",
    page: "/collection",
    icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  },
  {
    name: "me",
    page: "/me",
    icon: "M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z",
  },
];
export const Layout = (props: ILayoutProps): JSX.Element => {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [darkmode, setDarkmode] = useState(false);

  const onClickMenu = () => {
    setMenu((prev) => !prev);
  };
  const onClickDark = () => {
    setDarkmode((prev) => !prev);
    localStorage.setItem("dark-mode", darkmode ? "light" : "dark");
  };

  useEffect(() => {
    const mode = localStorage.getItem("dark-mode");
    if (mode === "dark") setDarkmode(true);
    else setDarkmode(false);
  }, []);

  return (
    <div
      className={`${
        darkmode ? "dark" : ""
      } w-full max-w-[600px] h-screen overflow-hidden m-auto flex flex-col relative`}
    >
      {menu ? (
        <div
          onClick={onClickMenu}
          className={`cursor-pointer absolute w-full h-full bg-zinc-950 transition-opacity duration-500 ${
            menu ? "opacity-50" : "opacity-0"
          }`}
        ></div>
      ) : null}
      <div className="w-full h-20 dark:bg-zinc-900 border-b-[1px] border-black dark:border-zinc-200 flex justify-between items-center px-3 dark:text-white">
        <h1 className="text-2xl font-bold">PAVE</h1>
        <div onClick={onClickMenu} className="cursor-pointer">
          <svg
            className="w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            ></path>
          </svg>
        </div>
      </div>
      <div className="w-full h-screen overflow-y-scroll dark:bg-zinc-900">
        {props.children}
      </div>
      <div className="w-full h-24 flex justify-between border-t-[1px] dark:bg-zinc-900 border-black dark:border-zinc-200">
        {MENU.map((el, i) => (
          <Link
            key={i}
            href={el.page}
            className={cls(
              "w-full h-full flex flex-col items-center justify-center cursor-pointer ",
              (el.page !== "/" && router.pathname.startsWith(el.page)) ||
                router.pathname === el.page
                ? "text-[#ffd014]"
                : "text-black dark:text-zinc-400"
            )}
          >
            <div className="w-8 h-10">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={el.icon}
                ></path>
              </svg>
            </div>
            <span className="text-sm">{el.name}</span>
          </Link>
        ))}
      </div>
      {menu ? (
        <div className="absolute bottom-0 w-full h-1/6 bg-white dark:bg-zinc-900 px-10 py-32 rounded-t-3xl">
          <ul>
            <li className="p-3 flex justify-between border-b-[1px] border-zinc-200 dark:border-zinc-500 dark:text-white">
              <span>Dark Mode</span>
              <div onClick={onClickDark} className="cursor-pointer">
                {!darkmode ? (
                  <svg
                    className="w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                )}
              </div>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};
