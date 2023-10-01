import { Item } from "@/src/components/item";
import { Layout } from "@/src/components/layout";

export default function PostPage(): JSX.Element {
  return (
    <Layout title="post">
      <div className="pt-6 py-6">
        <Item />
      </div>
    </Layout>
  );
}
