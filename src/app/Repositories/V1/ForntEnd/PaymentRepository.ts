import { Response } from "express";
import makePayment from "../../../Services/Payment/core/makePayment";

class PaymentRepository {
  constructor() {}

  async store(req: any, res: Response) {
    const { gateway, orderId } = req.body;
    let payment = new makePayment(gateway, orderId);
    let paymentRes = payment.callToGateway();
    return paymentRes;
    // const paymentResponse = makePayment.callToGateway();
  }
}

export default new PaymentRepository();
