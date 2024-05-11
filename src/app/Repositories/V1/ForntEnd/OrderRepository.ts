import { Response } from "express";
import Order from "../../../../models/Order";
import Cart from "../../../../models/Cart";
import Fee from "../../../../models/Fee";
import Product from "../../../../models/Product";
import mongoose from "mongoose";

class OrderRepository {
  constructor() {}

  async getfees() {
    let fees = await Fee.findOne({
      isActive: true,
    });
    return fees;
  }

  async store(req: any, res: Response) {
    const customerId = "663cbb6d7de80af4948d5e23";
    const { productId } = req.params;
    const { quantity, source } = req.query;
    const { shippingAddresId } = req.body;
    if (!shippingAddresId) throw Error("Valid shippingAddressId required!");
    if (!source)
      throw Error("source query parameter required for order. Ex: page, cart");

    let newOrder: any;
    let fees = await this.getfees();

    if (source === "page") {
      const product = await Product.findById(productId);
      if (!product) throw Error("Product not found!");

      let quantityPrice = Number(product.price) * (Number(quantity) || 1);
      let totalAmount =
        quantityPrice + fees.tax + fees.deliveryFee - fees.discount;

      newOrder = {
        customerId: customerId,
        referenceNumber: new mongoose.Types.ObjectId(),
        products: [
          {
            productId: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            quantityPrice: quantityPrice,
            sku: product.sku,
          },
        ],
        discount: fees.discount,
        tax: fees.tax,
        deliveryFee: fees.deliveryFee,
        totalAmount: totalAmount,
        status: "pending",
        shippingAddress: shippingAddresId,
      };
    }

    if (source === "cart") {
      let cart = await Cart.findOne({ customerId: customerId });
      if (!cart) throw Error("User not created cart yet!");
      let deliveryFee = fees.deliveryFee * cart.products.length;
      let totalAmount =
        cart.totalAmount + fees.tax + deliveryFee - fees.discount;

      newOrder = {
        customerId: customerId,
        referenceNumber: new mongoose.Types.ObjectId(),
        products: cart.products,
        discount: fees.discount,
        tax: fees.tax,
        deliveryFee: deliveryFee,
        totalAmount: totalAmount,
        status: "pending",
        shippingAddress: shippingAddresId,
      };
    }

    let storeOrder = await Order.create(newOrder);
    if (storeOrder) return "Order created";
    return "Something error, order not created";
  }

  async deleteOne(req: any, res: Response) {
    const customerId = "663cbb6d7de80af4948d5e23";

    const deleteOrderProduct = await Order.findOneAndUpdate(
      {},
      {
        $pull: { products: { productId: req.params.productId } },
      },
      {
        new: true,
      }
    );

    let updateAmount: number = 0;
    deleteOrderProduct.products.map((product: any) => {
      updateAmount += product.quantityPrice;
    });

    deleteOrderProduct.totalAmount = updateAmount;
    await deleteOrderProduct.save();
    return "Deleted product from cart";
  }
  async getOne(req: any, res: Response) {
    const customerId = "663cbb6d7de80af4948d5e23";
    let orders: any = await Order.find()
      .where("customerId")
      .equals(customerId)
      .populate("products.productId", "images")
      .sort({ _id: -1 });
    return orders;
    // let orderWithImage = Order.orderWithProductImage(orders);
    // return orderWithImage;
  }
}

export default new OrderRepository();
