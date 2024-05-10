import { Request, Response } from "express";
import JsonReponse from "../../../../lib/JsonReponse";
import OrderRepository from "../../../Repositories/V1/ForntEnd/OrderRepository";

class OrderController {
  constructor() {}

  async store(req: Request | any, res: Response) {
    const data = await OrderRepository.store(req, res);
    return JsonReponse.success(data);
  }
  async deleteOne(req: Request | any, res: Response) {
    const data = await OrderRepository.deleteOne(req, res);
    return JsonReponse.success(data);
  }
  async getOne(req: Request | any, res: Response) {
    const data = await OrderRepository.getOne(req, res);
    return JsonReponse.success(data);
  }
}

export default new OrderController();
