import { ITrack, playlist } from "@/src/axios";
import { Input } from "@/src/components/input";
import { Layout } from "@/src/components/layout";
import { cls } from "@/src/library/unil";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchPage(): JSX.Element {
  const [active, setActive] = useState(true);
  const [tracks, setTracks] = useState<ITrack>();
  const onClickTap = (value: boolean) => () => {
    setActive(value);
  };

  useEffect(() => {
    const getPlaylist = async (): Promise<ITrack> => {
      const { data }: ITrack = await playlist.getHitPlaylist();
      setTracks(data);
    };
    getPlaylist();
  }, []);
  return (
    <Layout title="search">
      <div className="w-full flex flex-col">
        <div className="px-3">
          <Input type="text" placeholder="feel the pave now -" />
        </div>
        <div className="w-full">
          <div className="w-full h-20 flex justify-around mb-2 cursor-pointer">
            <div
              onClick={onClickTap(true)}
              className={cls(
                "w-1/2 h-full py-4 text-center border-b-2 flex items-center justify-center",
                active
                  ? "border-[#ffd014] text-[#ffd014]"
                  : "border-zinc-200 dark:border-zinc-500 text-black dark:text-zinc-500"
              )}
            >
              <span>실시간 페이빙 음악</span>
            </div>
            <div
              onClick={onClickTap(false)}
              className={cls(
                "w-1/2 h-full py-4 text-center border-b-2 flex items-center justify-center",
                !active
                  ? "border-[#ffd014] text-[#ffd014]"
                  : "border-zinc-200 dark:border-zinc-500 text-black dark:text-zinc-500"
              )}
            >
              <span>최근 페이빙</span>
            </div>
          </div>
          {active ? (
            <div>
              <ul className="w-full">
                {tracks?.tracks.items.map((el, i) => (
                  <li
                    key={i}
                    className="grid w-full text-lg p-4 gap-3 dark:text-white border-b-[1px] border-zinc-200 dark:border-zinc-500 hover:text-[#ffd014] dark:hover:text-[#ffd014]"
                  >
                    <span>
                      {i + 1}. {el.track.name}
                    </span>
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
      </div>
    </Layout>
  );
}
