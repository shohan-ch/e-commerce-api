import { NextFunction, Request, Response } from "express";
import JsonReponse from "../../../../lib/JsonReponse";
import PostRepository from "../../../Repositories/V1/ForntEnd/PostRepository";
class PostController {
  constructor() {}

  async store(req: Request, res: Response) {
    const data = await PostRepository.store(req, res);
    return JsonReponse.success(data);
  }
  async getAll(req: Request, res: Response) {
    const data = await PostRepository.getAll(req, res);
    return JsonReponse.success(data);
  }
}

export default new PostController();
