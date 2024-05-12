import mongoose, { Schema, model } from "mongoose";

const PaymentGateWaySchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    sandboxCredentials: {
      appKey: String,
      secret: String,
      _id: false,
    },
    liveCredentials: {
      appKey: String,
      secret: String,
      _id: false,
    },
    isLiveActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("PaymentGateWay", PaymentGateWaySchema);
