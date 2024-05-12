import { Request, Response } from "express";
import Order from "../../../../models/Order";

class DbTransaction {
  constructor() {}

  async getAmount(data: any) {
    let order = await Order.findOne({ _id: data, status: "pending" });
    if (!order) throw Error("Amount data not found");
    return order.totalAmount;
  }
}

export default new DbTransaction();
