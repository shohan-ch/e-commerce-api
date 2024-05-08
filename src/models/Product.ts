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
      trim: true,
      required: true,
      unique: true,
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
      type: String,
      trim: true,
      // type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },

    images: {
      coverImage: {
        type: String,
        required: true,
      },
      images: [String],
    },
  },
  {
    statics: {
      productsWithImage(products) {
        let imagePath = `${process.env.BASE_URL}/uploads/products/`;

        const productWithImageUrl = products.map((product: any) => {
          const { coverImage, images } = product.images;
          product.images.coverImage =
            imagePath + product.sku + "/coverImage/" + coverImage;
          product.images.images = images.map(
            (img: any) => imagePath + product.sku + "/images/" + img
          );
          return product;
        });

        return productWithImageUrl;
      },
    },

    methods: {
      productWithImage() {
        let product: any = this;
        let imagePath = `${process.env.BASE_URL}/uploads/products/`;
        const { coverImage, images } = product.images;
        product.images.coverImage =
          imagePath + product.sku + "/coverImage/" + coverImage;
        product.images.images = images.map(
          (img: any) => imagePath + product.sku + "/images/" + img
        );
        return product;
      },
    },
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", productSchema);
