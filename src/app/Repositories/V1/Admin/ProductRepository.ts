import { Response } from "express";
import { unlinkSync } from "fs";
import Validation from "../../../../helpers/Validation";
import fileUploadMiddleware from "../../../../middlewares/fileUploadMiddleware";
import Post from "../../../../models/Post";

class ProductRepository {
  constructor() {}

  async store(req: any, res: Response) {
    req.filePath = "products/"; // Declare dynamic path and catch fileMiddleware

    return new Promise((resolve, reject) => {
      const uploadFile = fileUploadMiddleware.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "images", maxCount: 4 },
      ]);

      uploadFile(req, res, async (err) => {
        if (err) {
          reject(err);
        } else {
          try {
            // console.log(req.file, "file");
            // store in database
            const { title, text } = req.body;
            await Validation.validate(
              { title, text, image: req.file },
              { title: "required", text: "required", image: "required" }
            );

            const newPost = {
              title,
              text,
              image: req.file && req.file.path,
            };
            let post = await Post.create(newPost);
            if (post) {
              resolve("File uploaded successfully.");
            }
          } catch (error) {
            req.file && unlinkSync(req.file.path);
            reject(error);
          }
        }
      });
    });
  }
}

export default new ProductRepository();
