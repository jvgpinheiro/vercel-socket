import { NextApiRequest, NextApiResponse } from "next";
import { decycle } from "../../utils/JsonUtils";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body =
    typeof req.body === "string"
      ? req.body
      : JSON.stringify(req.body, decycle());
  res.status(200).json(body);
}
