// import AdminProductRepository from "app/Repositories/V1/Admin/AdminProductRepository";

import { Request, Response } from "express";
import AdminProductRepository from "../../../Repositories/V1/Admin/AdminProductRepository";
import JsonReponse from "../../../../lib/JsonReponse";

class AdminProductController {
  /**
   * @openapi
   * '/admin/products':
   *  post:
   *     tags:
   *     - Admin Products
   *     requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *           schema:
   *            type: object
   *            properties:
   *              name:
   *                type: string
   *                default: johndoe
   *              description:
   *                type: string
   *                default: johnDoe20!@
   *              sku:
   *                type: string
   *              category:
   *                type: string
   *              price:
   *                type: string
   *              quantity:
   *                type: string
   *              adminId:
   *                type: string
   *              coverImage:
   *                type: file
   *     responses:
   *      201:
   *        description: Producted added
   *      409:
   *        description: Conflict
   *      404:
   *        description: Not Found
   *      500:
   *        description: Server Error
   */

  async store(req: Request, res: Response) {
    const data = await AdminProductRepository.store(req, res);
    return JsonReponse.success(data);
  }

  /**
   * @openapi
   * '/admin/products':
   *  put:
   *     tags:
   *     - Admin Products
   *     requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *           schema:
   *            type: object
   *            properties:
   *              name:
   *                type: string
   *                default: johndoe
   *              description:
   *                type: string
   *                default: johnDoe20!@
   *              category:
   *                type: string
   *              price:
   *                type: string
   *              quantity:
   *                type: string
   *              adminId:
   *                type: string
   *              coverImage:
   *                type: file
   *     responses:
   *      201:
   *        description: Product updated
   *      409:
   *        description: Conflict
   *      404:
   *        description: Not Found
   *      500:
   *        description: Server Error
   */

  async update(req: Request, res: Response) {
    const data = await AdminProductRepository.update(req, res);
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

export default new AdminProductController();
