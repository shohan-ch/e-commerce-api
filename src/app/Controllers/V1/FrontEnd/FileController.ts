import { NextFunction, Request, Response } from "express";
import FileRepository from "../../../Repositories/V1/ForntEnd/FileRepository";
import JsonReponse from "../../../../lib/JsonReponse";
import multer from "multer";
import uploadMiddleware from "../../../../middlewares/fileUploadMiddleware";

class FileController {
  constructor() {}

  async store(req: Request | any, res: Response) {
    const data = await FileRepository.store(req, res);
    return JsonReponse.success(data);
  }
}

export default new FileController();
