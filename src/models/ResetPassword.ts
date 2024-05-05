import mongoose, { Schema } from "mongoose";

const ResetPasswordSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    token: { type: String, required: true },
    expireAt: {
      type: Date,
      default: new Date(),
      expires: 3600,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("ResetPassword", ResetPasswordSchema);
