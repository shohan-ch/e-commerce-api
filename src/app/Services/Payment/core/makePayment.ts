import { Request, Response } from "express";
import bkashPayment from "../bkash/bkashPayment";
import nagadPayment from "../nagad/nagadPayment";
import dbTransaction from "./dbTransaction";
import PaymentLog from "../../../../models/PaymentLog";
import stripePayment from "../stripe/stripePayment";

class MakePayment {
  constructor() {}

  async callToGateway(req: Request, res: Response) {
    const { gateway, orderId } = req.body;

    const customerId = "663cbb6d7de80af4948d5e23";
    const { products, amount } = await dbTransaction.getAmount(orderId);

    let payment: any;
    switch (gateway) {
      case "bkash":
        payment = new bkashPayment();
        break;
      case "nagad":
        payment = nagadPayment;
        break;
      case "stripe":
        payment = new stripePayment(products);
        break;
      default:
        break;
    }

    let response = await payment.init(amount);

    const newRequestLog: any = {
      userId: customerId,
      orderId: orderId,
      ipAddress: req.headers["x-forwarded-for"],
      amount,
      status: "pending",
      response: response,
    };

    if (response && gateway === "bkash") {
      newRequestLog.gateway = "bkash";
      newRequestLog.paymentId = response.paymentID;
      await PaymentLog.create(newRequestLog);
      return response.bkashURL;
    } else if (response && gateway === "stripe") {
      newRequestLog.paymentId = response.id;
      newRequestLog.gateway = "stripe";
      await PaymentLog.create(newRequestLog);
      return response.url;
      // res.redirect(response.url);
    }
  }

  bkashCallBack(paymentID: string, status: string) {
    let payment = new bkashPayment();
    let response = payment.bkashCallback(paymentID, status);
  }
}

export default new MakePayment();
