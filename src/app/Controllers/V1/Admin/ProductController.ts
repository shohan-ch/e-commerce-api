// import ProductRepository from "app/Repositories/V1/Admin/ProductRepository";

import { Request, Response } from "express";
import ProductRepository from "../../../Repositories/V1/Admin/ProductRepository";
import JsonReponse from "../../../../lib/JsonReponse";

class ProductController {
  async store(req: Request, res: Response) {
    const data = await ProductRepository.store(req, res);
    return JsonReponse.success(data);
  }

  async index(req: Request, res: Response) {
    return res.json();
  }

  async create(req: Request, res: Response) {
    return res.json();
  }

  async show(req: Request, res: Response) {
    return res.json();
  }
}

export default new ProductController();
