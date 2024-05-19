import { Request, Response } from "express";
import bkashPayment from "../bkash/bkashPayment";
import nagadPayment from "../nagad/nagadPayment";
import dbTransaction from "./dbTransaction";
import PaymentLog from "../../../../models/PaymentLog";
import stripePayment from "../stripe/stripePayment";
import Order from "../../../../models/Order";
import Customer from "../../../../models/Customer";

class MakePayment {
  constructor() {}

  async callToGateway(req: any, res: Response) {
    const { gateway, orderId } = req.body;

    const customerId = req.authUser._id;
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

  stripeCallBack(status: boolean, paymentId: string) {
    let payment = new stripePayment();
    let response = payment.stripeCallback(status, paymentId);
    return response;
  }
}

export default new MakePayment();
