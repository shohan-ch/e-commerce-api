import mongoose, { Schema, model } from "mongoose";

const PaymentLog = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    oderId: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    gateway: {
      type: String,
      required: true,
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
    },
    trxId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "success", "cancel"],
    },
    response: Object,
  },
  { timestamps: true, versionKey: false }
);

export default model("PaymentLog", PaymentLog);
