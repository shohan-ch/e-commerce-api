import { Request, Response } from "express";
import JsonReponse from "../../../../lib/JsonReponse";
import FileRepository from "../../../Repositories/V1/ForntEnd/FileRepository";
import CartRepository from "../../../Repositories/V1/ForntEnd/CartRepository";

class CartController {
  constructor() {}

  async deleteOne(req: Request | any, res: Response) {
    const data = await CartRepository.deleteOne(req, res);
    return JsonReponse.success(data);
  }
  async getOne(req: Request | any, res: Response) {
    const data = await CartRepository.getOne(req, res);
    return JsonReponse.success(data);
  }

  async store(req: Request | any, res: Response) {
    const data = await CartRepository.store(req, res);
    return JsonReponse.success(data);
  }
}

export default new CartController();
