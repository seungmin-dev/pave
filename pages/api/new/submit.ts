import withHandler from "@/src/library/server/withHandler";
import { withApiSession } from "@/src/library/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/src/library/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { photoUrl, songName, songArtist, songUrl },
    session: { user },
  } = req;

  const post = await client.post.create({
    data: {
      photoUrl,
      songName,
      songArtist,
      songUrl,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    post,
  });
}

export default withApiSession(withHandler({ method: "POST", fn: handler }));
