import { Request, Response } from "express";
import bkashPayment from "../bkash/bkashPayment";
import nagadPayment from "../nagad/nagadPayment";
import dbTransaction from "./dbTransaction";

class MakePayment {
  public paymentType: string;
  public data: any;

  constructor(type: string, data: any) {
    this.paymentType = type;
    this.data = data;
  }

  async callToGateway() {
    let payment: any;
    switch (this.paymentType) {
      case "bkash":
        payment = new bkashPayment();
        break;
      case "nagad":
        payment = nagadPayment;
        break;
      default:
        break;
    }
    let amount = await dbTransaction.getAmount(this.data);
    // return paymentData;
    let response = payment.init(amount);

    if (this.paymentType === "bkash" && response.bkashURL) {
      return response.bkashURL;
    } else {
      return false;
    }
  }
}

export default MakePayment;
