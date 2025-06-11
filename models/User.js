import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: String,
  username: String,
  createdAt: Date,
});

export default mongoose.model("User", userSchema);
