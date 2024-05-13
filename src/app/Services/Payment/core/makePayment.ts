import { Request, Response } from "express";
import bkashPayment from "../bkash/bkashPayment";
import nagadPayment from "../nagad/nagadPayment";
import dbTransaction from "./dbTransaction";
import PaymentLog from "../../../../models/PaymentLog";

class MakePayment {
  constructor() {}

  async callToGateway(req: Request) {
    const { gateway, orderId } = req.body;

    const customerId = "663cbb6d7de80af4948d5e23";

    let payment: any;
    switch (gateway) {
      case "bkash":
        payment = new bkashPayment();
        break;
      case "nagad":
        payment = nagadPayment;
        break;
      default:
        break;
    }
    let amount = await dbTransaction.getAmount(orderId);
    let response = payment.init(amount);

    if (response && gateway === "bkash") {
      const newRequestLog = {
        customerId,
        orderId: orderId,
        gateway: "bkash",
        ipAddress: req.headers["x-forwarded-for"],
        amount,
        status: "pending",
        paymentId: response.paymentID,
        response: response,
      };

      await PaymentLog.create(newRequestLog);

      return response.bkashURL;
    } else {
      return false;
    }
  }

  bkashCallBack(paymentID: string, status: string) {
    let payment = new bkashPayment();
    let response = payment.bkashCallback(paymentID, status);
  }
}

export default new MakePayment();
