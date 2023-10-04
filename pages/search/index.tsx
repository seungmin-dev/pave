import { ITrack, playlist } from "@/src/axios";
import { Input } from "@/src/components/input";
import { Layout } from "@/src/components/layout";
import { cls } from "@/src/library/unil";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SearchPage(): JSX.Element {
  const [active, setActive] = useState(true);
  const [tracks, setTracks] = useState<ITrack>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingTrack, setIsPlayingTrack] = useState("");

  const playerRef = useRef<HTMLAudioElement>(null);
  const onClickTap = (value: boolean) => () => {
    setActive(value);
  };
  const onClickPlay = (url: string) => () => {
    setIsPlayingTrack(url);
    playerRef.current!.src = url;

    if (isPlaying) playerRef.current?.pause();
    else playerRef.current?.play();

    setIsPlaying((prev) => !prev);
  };
  // const timeUpdate = (e) => {
  //   console.log(e.target.currentTime);
  //   if (e.target.currentTime > 27) {
  //     console.log(playerRef.current!.volume);
  //     playerRef.current!.volume = 0.5;
  //   }
  // };
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
                    className="flex items-center w-full text-lg p-4 gap-3 dark:text-white border-b-[1px] border-zinc-200 dark:border-zinc-500 "
                  >
                    <span className="mr-2">{i + 1}</span>
                    <div className="flex flex-col flex-grow">
                      <span className="block break-words h-7 whitespace-normal overflow-clip hover:text-[#ffd014] dark:hover:text-[#ffd014]">
                        {el.track.name}
                      </span>
                      <span className="text-sm text-zinc-700">
                        {el.track.artists[0].name}
                      </span>
                    </div>
                    <audio
                      ref={playerRef}
                      controls
                      loop
                      src={el.track.preview_url}
                      // onTimeUpdate={timeUpdate}
                      style={{ display: "none" }}
                    ></audio>
                    {el.track.preview_url ? (
                      <div
                        onClick={onClickPlay(el.track.preview_url)}
                        className="cursor-pointer"
                      >
                        {isPlaying &&
                        el.track.preview_url === isPlayingTrack ? (
                          <svg
                            style={{ width: "30px" }}
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
                              d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            style={{ width: "30px" }}
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
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                            />
                          </svg>
                        )}
                      </div>
                    ) : null}
                    <div className="py-2 px-3 bg-black text-white rounded-3xl cursor-pointer">
                      PAVE
                    </div>
                    {/* 이미 저장해뒀으면 PAVED */}
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
