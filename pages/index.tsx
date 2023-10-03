import { search } from "@/src/axios";
import { Item } from "@/src/components/item";
import { Layout } from "@/src/components/layout";
import { useEffect } from "react";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR("/api/token");
  const access_token = data?.data.access_token;

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
        {new Array(10).fill(1).map((el, i) => (
          <Item key={i} />
        ))}
      </div>
    </Layout>
  );
}
