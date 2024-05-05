import { Response } from "express";
import { unlinkSync } from "fs";
import Validation from "../../../../helpers/Validation";
import fileUploadMiddleware from "../../../../middlewares/fileUploadMiddleware";
import Post from "../../../../models/Post";
import User from "../../../../models/User";

class PostRepository {
  constructor() {}

  async store(req: any, res: Response) {
    req.filePath = "posts"; // Declare dynamic path and catch fileMiddleware

    return new Promise((resolve, reject) => {
      const uploadFile = fileUploadMiddleware.single("image");

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
  async getAll(req: any, res: Response) {
    let userPosts = await User.findOne()
      // .populate('posts', 'title text')   // Populate can declare two different way
      .populate({
        path: "posts",
        select: "title text",
        match: { title: { $ne: "Post 3" } },
      })
      .select("name email");

    return userPosts;
  }
}

export default new PostRepository();
