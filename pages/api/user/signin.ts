import { NextApiRequest, NextApiResponse } from "next";
import client from "@/src/library/server/client";
import twilio from "twilio";
import withHandler from "@/src/library/server/withHandler";
import bcrypt from "bcryptjs";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, name, password } = req.body;

  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const encryptedPass = bcrypt.hashSync(password, 10);

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            phone,
          },
          create: {
            phone,
            name,
            password: encryptedPass,
          },
        },
      },
    },
  });

  const message = await twilioClient.messages.create({
    messagingServiceSid: process.env.TWILIO_MSID,
    from: "+14846482761",
    to: process.env.MY_PHONE!,
    body: `[PAVE] 인증번호를 입력해주세요. [ ${payload} ]`,
  });
  console.log(message);

  return res.json({
    ok: true,
  });
}

export default withHandler({ method: "POST", fn: handler, isPrivate: false });
