import { search } from "@/src/axios";
import { Item, ItemProps } from "@/src/components/item";
import { Layout } from "@/src/components/layout";
import { useEffect } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const { data: token } = useSWR("/api/spotify/spotifyToken");
  const { data } = useSWR("api/post/fetch");
  const access_token = token?.data.access_token;

  const getData = async () => {
    const {
      data: { albums },
    } = await search.getHipsterAlbums();
  };

  useEffect(() => {
    localStorage.setItem("access_token", access_token);
    getData();
  }, [access_token]);

  return (
    <Layout title="home">
      <div className="py-6">
        {data?.posts.map((el: ItemProps) => (
          <Item key={uuidv4()} {...el} />
        ))}
      </div>
    </Layout>
  );
}
