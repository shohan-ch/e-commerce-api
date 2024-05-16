import { Response } from "express";
import makePayment from "../../../Services/Payment/core/makePayment";

class PaymentRepository {
  constructor() {}

  async store(req: any, res: Response) {
    // const { gateway, orderId } = req.body;
    let paymentResponse = makePayment.callToGateway(req, res);
    return paymentResponse;
  }
  async bkashCallback(req: any, res: Response) {
    const { paymentID, status } = req.query;
    const bkashExecuteCallbak = makePayment.bkashCallBack(paymentID, status);
  }
  async stripeCallback(req: any, res: Response) {
    const { success, canceled, paymentId } = req.query;
    const status = success ? true : false;
    const response = makePayment.stripeCallBack(status, paymentId);
    return response;
  }
}

export default new PaymentRepository();
