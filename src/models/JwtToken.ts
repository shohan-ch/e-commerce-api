import mongoose, { Schema } from "mongoose";

const jwtTokenSchema = new Schema(
  {
    email: { type: String, required: true },
    refreshToken: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("JwtToken", jwtTokenSchema);
