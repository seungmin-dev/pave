import withHandler from "@/src/library/server/withHandler";
import { withApiSession } from "@/src/library/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/src/library/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
  } = req;

  const posts = await client.post.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      user: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json({
    ok: true,
    posts,
  });
}

export default withApiSession(withHandler({ method: "GET", fn: handler }));
