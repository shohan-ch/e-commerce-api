import { Response } from "express";
import { unlinkSync } from "fs";
import Validation from "../../../../helpers/Validation";
import fileUploadMiddleware from "../../../../middlewares/fileUploadMiddleware";
import Post from "../../../../models/Post";
import User from "../../../../models/Customer";
import Product from "../../../../models/Product";

class ProductRepository {
  constructor() {}

  async getAll(req: any, res: Response) {
    const { pageNum, perPage } = req.query;

    let products = await Product.find()
      .skip(pageNum * perPage - perPage)
      .limit(perPage);

    products = Product.productsWithImage(products);
    return products;
  }
  async getOne(req: any, res: Response) {
    const { prooductId } = req.params;
    let product = await Product.findById({ _id: prooductId });
    if (!product) {
      throw Error("Product not found!");
    }
    product = product.productWithImage();
    return product;
  }

  async getByCategory(req: any, res: Response) {
    const { category } = req.params;
    const { pageNum, perPage } = req.query;
    let products = await Product.find({ category: { main: category } })
      .skip(pageNum * perPage - perPage)
      .limit(perPage);
    if (!products.length) {
      throw Error("Product not found by category name " + category);
    } else {
      products = Product.productsWithImage(products);
      return products;
    }
  }

  async store(req: any, res: Response) {}
}

export default new ProductRepository();
