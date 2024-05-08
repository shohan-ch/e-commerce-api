import { Request, Response } from "express";
import JsonReponse from "../../../../lib/JsonReponse";
import FileRepository from "../../../Repositories/V1/ForntEnd/FileRepository";
import ProductRepository from "../../../Repositories/V1/ForntEnd/ProductRepository";

class ProductController {
  constructor() {}

  async getAll(req: Request | any, res: Response) {
    const data = await ProductRepository.getAll(req, res);
    return JsonReponse.success(data);
  }

  async getOne(req: Request | any, res: Response) {
    const data = await ProductRepository.getOne(req, res);
    return JsonReponse.success(data);
  }

  async getByCategory(req: Request | any, res: Response) {
    const data = await ProductRepository.getByCategory(req, res);
    return JsonReponse.success(data);
  }

  async store(req: Request | any, res: Response) {
    const data = await FileRepository.store(req, res);
    return JsonReponse.success(data);
  }
}

export default new ProductController();
