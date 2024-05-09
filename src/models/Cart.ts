import mongoose, { Schema, model } from "mongoose";

const CartSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantityPrice: Number,
        quantity: { type: Number },
        sku: String,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    statics: {},
    methods: {},
    timestamps: true,
    versionKey: false,
  }
);

export default model("Cart", CartSchema);
