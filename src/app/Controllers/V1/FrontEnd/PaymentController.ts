import { Request, Response } from "express";
import JsonReponse from "../../../../lib/JsonReponse";
import PaymentRepository from "../../../Repositories/V1/ForntEnd/PaymentRepository";

class PaymentController {
  constructor() {}

  async store(req: Request | any, res: Response) {
    const data = await PaymentRepository.store(req, res);
    console.log(data);
    return JsonReponse.success(data);
  }
  async bkashCallback(req: any, res: Response) {
    const data = await PaymentRepository.bkashCallback(req, res);
    return JsonReponse.success(data);
  }
}

export default new PaymentController();
