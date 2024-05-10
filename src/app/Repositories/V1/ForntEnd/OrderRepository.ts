import { Response } from "express";
import Order from "../../../../models/Order";
import Product from "../../../../models/Product";

class OrderRepository {
  constructor() {}

  async store(req: any, res: Response) {
    const customerId = "663cbb6d7de80af4948d5e23";
    // const customerId = new mongoose.Types.ObjectId();
    const { productId } = req.params;
    const { quantity, type } = req.query;

    const product = await Product.findById(productId);
    const isExistOrder = await Order.findOne({ customerId });

    if (!product) throw Error("Product not found!");

    let selectProduct: any;
    if (isExistOrder) {
      const { products } = isExistOrder;
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

      isExistOrder.products = selectProduct;

      // Count total amount

      // isExistOrder.totalAmount = products.length ? totalAmount : product.price;

      isExistOrder.totalAmount = products.some(
        (product) => product.productId == productId
      )
        ? totalAmount
        : totalAmount + Number(product.price) * (quantity || 1);

      await isExistOrder.save();
    } else {
      let newOrderItem = {
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
      await Order.create(newOrderItem);
    }

    return "updated cart";
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
