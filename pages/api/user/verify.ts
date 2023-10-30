import { NextApiRequest, NextApiResponse } from "next";
import client from "@/src/library/server/client";
import withHandler from "@/src/library/server/withHandler";
import { withApiSession } from "@/src/library/server/withSession";
import bcrypt from "bcryptjs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;

  if (data.kind === "signin") {
    const confirm = await client.token.findUnique({
      where: { payload: data.token },
    });
    req.session.user = { id: confirm?.userId as number };

    await client.token.deleteMany({ where: { userId: confirm?.userId } });
    if (!confirm) res.status(404).end();
  } else if (data.kind === "login") {
    const confirm = await client.user.findUnique({
      where: { phone: data.phone },
    });
    const compare = bcrypt.compareSync(data.password, confirm!.password);

    if (!compare) res.status(404).end();
    req.session.user = { id: confirm?.id as number };
  }
  await req.session.save();

  return res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({ method: "POST", fn: handler, isPrivate: false })
);
