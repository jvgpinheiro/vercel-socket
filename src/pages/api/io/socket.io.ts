import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { decycle } from "../../../utils/JsonUtils";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? `https://admin.reverde.com.br`
      : `http://localhost:3000`;
  const axiosConfig = {
    baseURL,
  };
  await axios.post(
    "/api/log",
    { data: JSON.stringify(res.socket, decycle()) },
    axiosConfig
  );
  res.status(200).json({ data: JSON.stringify(res.socket, decycle()) });
}
