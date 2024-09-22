import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "./config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const customerId = req.body.customerId;
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.AUTH0_BASE_URL}/billing`,
    });
    res.status(200).json(session);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
