import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Set CORS headers
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://dice-test-seven.vercel.app",
  ); // Allow your Vercel app
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allowed headers

  if (req.method === "POST") {
    const { username, email } = req.body;

    if (typeof username !== "string" || typeof email !== "string") {
      return res.status(400).json({ error: "Invalid input" });
    }

    try {
      const user = await prisma.user.create({
        data: { username, email },
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "User could not be created" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Error retrieving users" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
