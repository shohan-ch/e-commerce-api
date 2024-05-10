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
        _id: false,
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
    statics: {
      cartWithProductImage(cart) {
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

export default model("Cart", CartSchema);
