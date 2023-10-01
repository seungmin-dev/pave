import { Item } from "@/src/components/item";
import { Layout } from "@/src/components/layout";

export default function Home() {
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
