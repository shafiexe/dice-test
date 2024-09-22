import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "./config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const email = req.body.email;
    const customer = await stripe.customers.search({
      query: `email: "${email}"`,
      expand: ["data.subscriptions"],
    });
    res.status(200).json(customer);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
