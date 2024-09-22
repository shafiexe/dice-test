// pages/api/webhooks.ts

import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { stripe, webhookSecret } from "./config";

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig: any = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret,
      );
    } catch (err: any) {
      console.error("Webhook error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle specific webhook events
    switch (event.type) {
      case "payment_intent.succeeded":
        // Handle successful payment
        console.log("PaymentIntent was successful!");
        console.log(event.data);
        break;
      case "payment_method.attached":
        // Handle successful payment method attachment
        console.log("PaymentMethod was attached to a Customer!");
        break;
      // Add other event handlers as needed

      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhookHandler;
