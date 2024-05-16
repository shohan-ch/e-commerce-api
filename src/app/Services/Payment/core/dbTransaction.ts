import { Request, Response } from "express";
import Order from "../../../../models/Order";
import PaymentLog from "../../../../models/PaymentLog";
import PaymentDetail from "../../../../models/PaymentDetail";

class DbTransaction {
  constructor() {}

  async getAmount(orderId: any) {
    let order: any = await Order.findOne({ _id: orderId, status: "pending" });
    if (!order) throw Error("Order or Amount data not found");
    let result = { ...order._doc };

    return {
      amount: result.totalAmount,
      products: result.products,
    };
  }

  async storePaymentDetails(response: any) {
    try {
      const userId = "663cbb6d7de80af4948d5e23";
      let paymentLog = await PaymentLog.findOne({
        paymentId: response.paymentID,
      });

      const newPaymentLog = {
        userId,
        orderId: paymentLog.orderId,
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
      // Payment details store in database
      const details = {
        userId,
        orderId: paymentLog.orderId,
        gatewate: paymentLog.gateway,
        amount: response.amount,
        status: "success",
        paymentId: response.paymentID,
        trxId: response.trxID,
        response: response,
      };
      await PaymentDetail.create(details);
      return true;
    } catch (error) {
      console.log(error);
      throw Error(error.message);
    }
  }
}

export default new DbTransaction();
