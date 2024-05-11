import mongoose, { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    referenceNumber: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      trim: true,
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
        _id: false,
      },
    ],
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    tax: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "canceled"],
      default: "pending",
      required: "true",
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    statics: {
      orderWithProductImage(cart) {
        let imagePath = `${process.env.BASE_URL}/uploads/products/`;
        const { products } = cart;

        cart.products = products.map((product: any) => {
          const { images, coverImage } = product.productId.images;
          product.productId.images.coverImage =
            imagePath + product.sku + "/coverImage/" + coverImage;

          product.productId.images.images = images.map((image: any) => {
            return imagePath + product.sku + "/images/" + image;
          });
          return product;
        });
        return cart;

        // let cartsWithImage = carts.map((cart: any) => {
        //   const { products } = cart;
        //   cart.products = products.map((product: any) => {
        //     const { images, coverImage } = product.productId.images;
        //     product.productId.images.coverImage =
        //       imagePath + product.sku + "/coverImage/" + coverImage;

        //     product.productId.images.images = images.map((image: any) => {
        //       return imagePath + product.sku + "/images/" + image;
        //     });
        //     return product;
        //   });
        //   return cart;
        // });
        // return cartsWithImage;
      },
    },
    methods: {},
    timestamps: true,
    versionKey: false,
  }
);

export default model("Order", OrderSchema);
