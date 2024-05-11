import mongoose, { Schema, model } from "mongoose";

const FeeSchema = new Schema(
  {
    discount: {
      type: Number,
      required: true,
      default: 10,
    },
    tax: {
      type: Number,
      required: true,
      default: 5,
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 20,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    methods: {},
    timestamps: true,
    versionKey: false,
  }
);

export default model("Fee", FeeSchema);
