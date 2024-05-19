import { Response } from "express";
import Cart from "../../../../models/Cart";
import Product from "../../../../models/Product";

class ShippingAddressRepository {
  constructor() {}

  async store(req: any, res: Response) {
    return "123";
  }
}

export default new ShippingAddressRepository();
