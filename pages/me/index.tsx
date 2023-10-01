import { Layout } from "@/src/components/layout";
import Link from "next/link";

export default function MePage(): JSX.Element {
  return (
    <Layout title="me">
      <div className="w-full">
        <div className="pt-16 w-full flex flex-col items-center space-y-5 mb-10">
          {/* <img /> */}
          <div className="w-40 h-40 rounded-full bg-zinc-100" />
          <span className="text-2xl font-semibold dark:text-white">닉네임</span>
        </div>
        <div className="w-full mb-6">
          <ul className="w-full h-16 grid grid-cols-3 justify-around">
            <li className="flex flex-col justify-center items-center space-y-2">
              <span className="dark:text-white">포스팅</span>
              <span className="dark:text-white">10</span>
            </li>
            {/* <div className="w-[1px] h-full bg-zinc-300" /> */}
            <li className="flex flex-col justify-center items-center space-y-2">
              <span className="dark:text-white">팔로잉</span>
              <span className="dark:text-white">8</span>
            </li>
            {/* <div className="w-[1px] h-full bg-zinc-300" /> */}
            <li className="flex flex-col justify-center items-center space-y-2">
              <span className="dark:text-white">팔로워</span>
              <span className="dark:text-white">3</span>
            </li>
          </ul>
        </div>
        <div className="w-full h-auto grid grid-rows-3 grid-cols-3 gap-1 overflow-y-scroll">
          {new Array(24).fill(1).map((el, i) => (
            // <Link key={i} href={`/${userId}/${postId}`}>
            <Link key={i} href={`/me/post`}>
              <div className="cursor-pointer">
                <div className="w-full h-48 bg-zinc-200" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
