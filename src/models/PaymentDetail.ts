import mongoose, { Schema, model } from "mongoose";

const PaymentDetailsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    gateway: {
      type: String,
      required: true,
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

export default model("PaymentDetail", PaymentDetailsSchema);
