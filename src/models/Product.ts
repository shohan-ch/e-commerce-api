import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      default: false,
    },
    sku: {
      type: String,
      required: true,
    },
    category: {
      main: String,
      secondary: String,
      third: String,
    },

    price: {
      type: Number,
      required: true,
    },
    DiscountPrice: {
      type: Number,
    },
    salePrice: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    promoCode: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    adminId: {
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },

    images: [
      {
        coverImage: {
          type: String,
          required: true,
        },
        images: [String],
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default model("Product", productSchema);
