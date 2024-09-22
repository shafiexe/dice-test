import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "./config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const priceId = req.body.priceId;
    const customerEmail = req.body.email;
    const trialDays = req.body?.trialDays;
    const requestObj: any = {
      success_url: `${process.env.AUTH0_BASE_URL}/billing`,
      cancel_url: `${process.env.AUTH0_BASE_URL}/billing`,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      automatic_tax: {
        enabled: true,
      },
      mode: "subscription",
      customer_email: customerEmail,
    };
    if (trialDays > 0) {
      requestObj["subscription_data"] = {
        trial_period_days: trialDays,
      };
    }
    const session = await stripe.checkout.sessions.create(requestObj);
    res.status(200).json(session);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
