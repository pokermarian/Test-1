import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import webhookRoute from "./routes/webhook.js";

dotenv.config();
const app = express();

connectDB();

app.use("/api/clerk", webhookRoute);

app.get("/test", (req, res) => {
  res.json({ message: "Test route working" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
