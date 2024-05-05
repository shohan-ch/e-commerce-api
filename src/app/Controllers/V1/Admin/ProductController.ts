import { Request, Response } from "express";

class ProductController {
  async store(req: Request, res: Response) {
    return res.json();
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
