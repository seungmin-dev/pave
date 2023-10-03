import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => res.data);

  res.json({ status: 200, data });
}

export default handler;
