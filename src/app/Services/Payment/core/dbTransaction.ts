import { Request, Response } from "express";
import Order from "../../../../models/Order";
import PaymentLog from "../../../../models/PaymentLog";

class DbTransaction {
  constructor() {}

  async getAmount(data: any) {
    let order = await Order.findOne({ _id: data, status: "pending" });
    if (!order) throw Error("Amount data not found");
    return order.totalAmount;
  }

  async storePaymentDetails(response: any) {
    try {
      const userId = "663cbb6d7de80af4948d5e23";
      let paymentLog = await PaymentLog.findOne({
        paymentId: response.paymentID,
      });

      const newPaymentLog = {
        userId,
        orderId: paymentLog.oderId,
        gateway: paymentLog.gateway,
        ipAddress: paymentLog.ipAddress,
        amount: response.amount,
        status: "success",
        paymentId: response.paymentID,
        trxId: response.trxID,
        response: response,
      };
      const newLog = await PaymentLog.create(newPaymentLog);
      if (!newLog) throw Error("payment log not created.");
    } catch (error) {
      console.log(error);
      throw Error(error.message);
    }
  }
}

export default new DbTransaction();
