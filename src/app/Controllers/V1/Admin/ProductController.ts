// import ProductRepository from "app/Repositories/V1/Admin/ProductRepository";

import { Request, Response } from "express";
import ProductRepository from "../../../Repositories/V1/Admin/ProductRepository";
import JsonReponse from "../../../../lib/JsonReponse";

class ProductController {
  /**
   * @swagger
   * api/v1/admin/products:
   *   post:
   *     summary: Get employee by ID.
   *     description: Get employee by ID.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            type: object
   *            required:
   *              - username
   *              - email
   *              - password
   *            properties:
   *              username:
   *                type: string
   *                default: johndoe
   *              email:
   *                type: string
   *                default: johndoe@mail.com
   *              password:
   *                type: string
   *                default: johnDoe20!@
   *     responses:
   *       '200':
   *         description: A successful response
   *       '404':
   *         description: Employee not found
   *       '500':
   *         description: Internal server error
   */

  async store(req: Request, res: Response) {
    const data = await ProductRepository.store(req, res);
    return JsonReponse.success(data);
  }

  async update(req: Request, res: Response) {
    const data = await ProductRepository.update(req, res);
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
