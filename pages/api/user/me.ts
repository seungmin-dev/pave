import { NextApiRequest, NextApiResponse } from "next";
import client from "@/src/library/server/client";
import withHandler from "@/src/library/server/withHandler";
import { withApiSession } from "@/src/library/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(withHandler({ method: "GET", fn: handler }));
