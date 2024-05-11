import { Response } from "express";
import Order from "../../../../models/Order";
import Product from "../../../../models/Product";
import mongoose from "mongoose";

class OrderRepository {
  constructor() {}

  async store(req: any, res: Response) {
    const customerId = "663cbb6d7de80af4948d5e23";
    const { productId } = req.params;
    const { quantity } = req.query;

    const product = await Product.findById(productId);
    const isExistOrder = await Order.findOne({ customerId });
    if (!product) throw Error("Product not found!");

    let newOrder = {
      customerId: customerId,
      referenceNumber: new mongoose.Types.ObjectId(),
      products: [
        {
          productId: productId,
          name: product.name,
          price: product.price,
          quantity: quantity,
          quantityPrice: Number(product.price) * Number(quantity),
          sku: product.sku,
        },
      ],
    };

    return "updated order";
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
    let cart = await Order.findOne()
      .where("customerId")
      .equals(customerId)
      .populate("products.productId", "images");

    let cartsWithImage = Order.orderWithProductImage(cart);
    return cartsWithImage;
  }
}

export default new OrderRepository();
