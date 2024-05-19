import { Request, Response } from "express";
import JsonReponse from "../../../../lib/JsonReponse";
import ShippingAddressRepository from "../../../Repositories/V1/ForntEnd/ShippingAddressRepository";

class ShippingAddressController {
  constructor() {}

  async store(req: Request | any, res: Response) {
    const data = await ShippingAddressRepository.store(req, res);
    return JsonReponse.success(data);
  }
}

export default new ShippingAddressController();
