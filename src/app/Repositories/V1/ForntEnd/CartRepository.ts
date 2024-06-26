import { Response } from "express";
import Cart from "../../../../models/Cart";
import Product from "../../../../models/Product";

class CartRepository {
  constructor() {}

  async deleteOne(req: any, res: Response) {
    const customerId = "663cbb6d7de80af4948d5e23";

    const deleteCartProduct = await Cart.findOneAndUpdate(
      {},
      {
        $pull: { products: { productId: req.params.productId } },
      },
      {
        new: true,
      }
    );

    let updateAmount: number = 0;
    deleteCartProduct.products.map((product: any) => {
      updateAmount += product.quantityPrice;
    });

    deleteCartProduct.totalAmount = updateAmount;
    await deleteCartProduct.save();
    return "Deleted product from cart";

    // let del = await Cart.deleteOne({
    //   products: {
    //     $in: [{ productId: req.params.productId }],
    //   },
    // });
    // console.log(del);

    // let cart: any = await Cart.findOne().where("customerId").equals(customerId);

    // cart.products = cart.products.filter(
    //   (product: any) => product.productId != req.params.productId
    // );

    // let updateAmount: number = 0;
    // cart.products.map((product: any) => {
    //   updateAmount += product.quantityPrice;
    // });

    // console.log(updateAmount);
    // cart.totalAmount = Number(updateAmount);
    // await cart.save();
  }
  async getOne(req: any, res: Response) {
    const customerId = "663cbb6d7de80af4948d5e23";
    let cart = await Cart.findOne()
      .where("customerId")
      .equals(customerId)
      .populate("products.productId", "images");

    let cartsWithImage = Cart.cartWithProductImage(cart);
    return cartsWithImage;
  }

  async store(req: any, res: Response) {
    const customerId = "663cbb6d7de80af4948d5e23";
    // const customerId = new mongoose.Types.ObjectId();
    const { productId } = req.params;
    const { quantity, type } = req.query;

    const product = await Product.findById(productId);
    const isExistCart = await Cart.findOne({ customerId });

    if (!product) throw Error("Product not found!");

    let selectProduct: any;
    if (isExistCart) {
      const { products } = isExistCart;
      let totalAmount: number = 0;

      let updateProducts =
        products.length &&
        products.map((product) => {
          if (product.productId == productId && type === "increment") {
            product.quantity += Number(quantity);
          }
          if (product.productId == productId && type === "decrement") {
            product.quantity != 1 && (product.quantity -= Number(quantity));
          }

          product.quantityPrice = product.quantity * product.price;
          totalAmount += product.quantityPrice;
          return product;
        });

      selectProduct = products.some((product) => product.productId == productId)
        ? updateProducts
        : [
            ...products,
            {
              productId: productId,
              name: product.name,
              price: product.price,
              quantity: quantity || 1,
              sku: product.sku,
              quantityPrice: Number(product.price) * (quantity || 1),
            },
          ];

      // Update cart

      isExistCart.products = selectProduct;

      // Count total amount

      // isExistCart.totalAmount = products.length ? totalAmount : product.price;

      isExistCart.totalAmount = products.some(
        (product) => product.productId == productId
      )
        ? totalAmount
        : totalAmount + Number(product.price) * (quantity || 1);

      await isExistCart.save();
    } else {
      let newCartItem = {
        customerId: customerId,
        products: [
          {
            productId: productId,
            name: product.name,
            price: product.price,
            quantity: quantity || 1,
            sku: product.sku,
            quantityPrice: product.price * (quantity || 1),
          },
        ],
        totalAmount: product.price * (quantity || 1),
      };
      await Cart.create(newCartItem);
    }

    return "updated cart";
  }
}

export default new CartRepository();
