import { useRef, useState } from "react";
import useMutation from "@/src/library/client/useMutation";
import useUser from "@/src/library/client/useUser";
import { Button } from "@/src/components/button";
import { Input } from "@/src/components/input";
import { Layout } from "@/src/components/layout";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default function NewPage(): JSX.Element {
  const { user } = useUser();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [tempUrl, setTempUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState(false);
  const [song, setSong] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  const [submit] = useMutation("/api/new/submit");

  const onClickUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileRef.current?.click();
  };
  const onChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setLoading(true);
    const { files } = event.target;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setTempUrl(event.target?.result);
        setFile(files[0]);
      }
    };
    setLoading(false);
  };
  const onClickSearch = () => {
    setSearch((prev) => !prev);
  };
  const onClickSelectSong = (song: string) => () => {
    setSong(song);
    setSearch(false);
  };

  const onClickSubmit = async () => {
    setSubmitting(true);
    try {
      const locationRef = ref(storage, `users_pic/${user?.id}/${uuidv4()}`);
      const result = await uploadBytes(locationRef, file!);
      const uploadedUrl = await getDownloadURL(result.ref);

      submit({
        photoUrl: uploadedUrl,
        songName: "이 노래",
        songArtist: "이 가수",
        songUrl: "이 주소",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
    router.push("/");
  };

  return (
    <Layout title="new">
      <div className="w-full h-full p-2">
        <div className="w-full aspect-square rounded-xl overflow-hidden">
          {tempUrl ? (
            <img src={tempUrl} className="h-full w-auto m-auto" />
          ) : (
            <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
              <h4 className="text-2xl text-zinc-400">
                Upload a picture that goes well
                <br />
                with the song you want to pave !
              </h4>
            </div>
          )}
        </div>
        <Button onClick={onClickUpload} type="button">
          {loading ? "Loading..." : tempUrl ? "Change Photo" : "Photo Upload"}
        </Button>
        <input
          className="hidden"
          type="file"
          ref={fileRef}
          onChange={onChangeFile}
        />
        <div className="flex gap-3 justify-between">
          <div className="flex gap-3">
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
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
              />
            </svg>
            <input type="text" className="w-3/5" defaultValue={song} />
          </div>
          <button
            type="button"
            onClick={onClickSearch}
            className="px-5 py-3 my-4 bg-white border-2 tracking-wider text-black text-center rounded-xl font-bold cursor-pointer hover:bg-zinc-100"
          >
            Select Song
          </button>
        </div>
        <Button onClick={onClickSubmit} type="button">
          {submitting ? "Loading..." : "Pave !"}
        </Button>
      </div>
      {search ? (
        <>
          <div
            onClick={onClickSearch}
            className="cursor-pointer w-full h-full absolute top-0 bg-zinc-800 backdrop-blur-xl opacity-40"
          ></div>
          <div className="w-full h-5/6 absolute bottom-0 z-10 bg-zinc-100 pt-10 px-3 rounded-t-3xl backdrop-blur-3xl">
            <Input type="text" placeholder="Search Songs..." />
            {new Array(15).fill(1).map((el, i) => (
              <div
                key={i}
                onClick={onClickSelectSong(el)}
                className="py-4 px-3 cursor-pointer hover:font-bold"
              >
                저장해둔 노래 - 가수
              </div>
            ))}
          </div>
        </>
      ) : null}
    </Layout>
  );
}
