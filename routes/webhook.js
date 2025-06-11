import express from "express";
import { Webhook } from "svix";
import User from "../models/User.js";

const router = express.Router();

router.post("/api/clerk", express.raw({ type: "application/json" }), async (req, res) => {
  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).send("Invalid webhook");
  }

  const { type, data } = evt;

  if (type === "user.created") {
    const { id, email_addresses, username, created_at } = data;

    try {
      await User.create({
        clerkId: id,
        email: email_addresses[0]?.email_address,
        username,
        createdAt: new Date(created_at),
      });
      console.log("User created in MongoDB");
    } catch (err) {
      console.error("Error saving user:", err.message);
    }
  }

  res.status(200).send("Webhook received");
});

export default router;
