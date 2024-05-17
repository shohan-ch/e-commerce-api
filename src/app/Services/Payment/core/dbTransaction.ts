import { orders } from "./../../../../routes/FrontEnd/V1/orders";
import { Request, Response } from "express";
import Order from "../../../../models/Order";
import PaymentLog from "../../../../models/PaymentLog";
import PaymentDetail from "../../../../models/PaymentDetail";
import path from "path";
import ejs from "ejs";
import Nodemailer from "../../../../lib/Nodemailer";

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

  async storePaymentDetails(response: any, status: boolean) {
    try {
      const paymentId = response.id || response.paymentID;

      const userId = "663cbb6d7de80af4948d5e23";
      let paymentLog = await PaymentLog.findOne({
        paymentId: paymentId,
        status: "pending",
      });

      const successPaymentLog = {
        userId,
        orderId: paymentLog.orderId,
        gateway: paymentLog.gateway,
        ipAddress: paymentLog.ipAddress,
        amount: response.amount || paymentLog.amount,
        status: "success",
        paymentId: paymentId,
        trxId: response.trxID || response.id,
        response: response,
      };

      const newLog = await PaymentLog.create(successPaymentLog);

      if (!newLog) throw Error("payment log not created.");

      // Payment details store in database
      const details = {
        userId,
        orderId: paymentLog.orderId,
        gateway: paymentLog.gateway,
        amount: response.amount || paymentLog.amount,
        status: "success",
        paymentId: paymentId,
        trxId: response.trxID || response.id,
        response: response,
      };
      await PaymentDetail.create(details);

      // Mail send
      const order = await Order.findById(paymentLog.orderId);
      let sendMail = await this.invoiceMailSend(
        response.email || "testOrder@ss.com",
        order
      );

      return true;
    } catch (error) {
      console.log(error);
      throw Error(error.message);
    }
  }

  async invoiceMailSend(email: string, data: any) {
    try {
      const templatePath = path.resolve("src/templates/invoice.ejs");
      let invoiceTemplate = await ejs.renderFile(templatePath, { data });
      await Nodemailer.sendMail(email, "Invoice receipt", invoiceTemplate);
      return true;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

export default new DbTransaction();
