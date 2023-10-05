import { ItemProps } from "@/src/components/item";
import { Layout } from "@/src/components/layout";
import useUser from "@/src/library/client/useUser";
import Link from "next/link";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

export default function MePage(): JSX.Element {
  const { user } = useUser();
  const { data } = useSWR("/api/post/fetch");
  return (
    <Layout title="me">
      <div className="w-full">
        <div className="pt-16 w-full flex flex-col items-center space-y-5 mb-10">
          {/* <img src={user.avatar} /> */}
          <div className="w-40 h-40 rounded-full bg-zinc-100" />
          <span className="text-2xl font-semibold dark:text-white">
            {user.name}
          </span>
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
          {data?.posts.map((el: ItemProps) => (
            <Link key={uuidv4()} href={`/me/post/${el.id}`}>
              <div className="cursor-pointer overflow-hidden aspect-square flex justify-center items-center">
                <img src={el.photoUrl} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
