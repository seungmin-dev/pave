import { Layout } from "@/src/components/layout";
import { cls } from "@/src/library/client/unil";
import { useState } from "react";

export default function MePage(): JSX.Element {
  const [active, setActive] = useState(true);
  const onClickTap = (value: boolean) => () => {
    setActive(value);
  };
  return (
    <Layout title="collection">
      <div className="w-full flex flex-col">
        <div className="w-full h-20 flex justify-around mb-6 cursor-pointer items-center">
          <div
            className={cls(
              "w-1/2 h-full py-4 border-b-2 text-center flex items-center justify-center",
              active
                ? "border-[#ffd014] text-[#ffd014]"
                : "border-zinc-200 dark:border-zinc-500 text-black dark:text-zinc-500"
            )}
            onClick={onClickTap(true)}
          >
            <span>팝송 아카이브</span>
          </div>
          <div
            className={cls(
              "w-1/2 h-full py-4 border-b-2 text-center flex items-center justify-center",
              !active
                ? "border-[#ffd014] text-[#ffd014]"
                : "border-zinc-200 dark:border-zinc-500 text-black dark:text-zinc-500"
            )}
            onClick={onClickTap(false)}
          >
            <span>하트 아카이브</span>
          </div>
        </div>
        {active ? (
          <div>
            <ul className="">
              {new Array(20).fill(1).map((el, i) => (
                <li
                  key={i}
                  className="p-3 border-b-[1px] border-zinc-200 dark:border-zinc-500 flex justify-between items-center"
                >
                  <span className="pl-3  dark:text-white">음악 어쩌구</span>
                  <button className="bg-black dark:bg-zinc-500 text-white py-1 px-3 rounded-full cursor-pointer hover:opacity-70">
                    PAVING
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="w-full h-auto grid grid-cols-3 grid-rows-3 gap-1 overflow-y-scroll">
            {new Array(20).fill(1).map((el, i) => (
              // <Link key={i} href={`/${userId}/${postId}`}>
              <div
                key={i}
                className="w-full h-48 bg-zinc-200 cursor-pointer"
              ></div>
              // </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
