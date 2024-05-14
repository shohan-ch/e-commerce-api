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
}

export default new PaymentRepository();
