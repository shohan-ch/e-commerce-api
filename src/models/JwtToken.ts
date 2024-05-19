import mongoose, { Schema } from "mongoose";

const jwtTokenSchema = new Schema(
  {
    email: { type: String },
    mobile: { type: String },
    refreshToken: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("JwtToken", jwtTokenSchema);
