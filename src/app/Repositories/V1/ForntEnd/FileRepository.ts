import { Response } from "express";
import fileUploadMiddleware from "../../../../middlewares/fileUploadMiddleware";

class FileRepository {
  constructor() {}

  async store(req: any, res: Response) {
    req.filePath = Math.floor(100000 + Math.random() * 900000); // Declare dynamic path and catch fileMiddleware
    return new Promise((resolve, reject) => {
      const uploadFile = fileUploadMiddleware.single("file");

      uploadFile(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("File uploaded successfully.");
        }
      });
    });
  }
}

export default new FileRepository();
