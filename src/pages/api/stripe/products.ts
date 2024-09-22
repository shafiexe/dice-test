import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "./config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const products: any = await stripe.products.search({
      query: 'active: "true"',
    });
    res.status(200).json(products);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
