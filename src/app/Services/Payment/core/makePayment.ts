import { Request, Response } from "express";
import bkashPayment from "../bkash/bkashPayment";
import nagadPayment from "../nagad/nagadPayment";
import dbTransaction from "./dbTransaction";

class MakePayment {
  constructor() {}

  async callToGateway(paymentType: string, data: any) {
    let payment: any;
    switch (paymentType) {
      case "bkash":
        payment = new bkashPayment();
        break;
      case "nagad":
        payment = nagadPayment;
        break;
      default:
        break;
    }
    let amount = await dbTransaction.getAmount(data);
    let response = payment.init(amount);

    if (paymentType === "bkash") {
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
