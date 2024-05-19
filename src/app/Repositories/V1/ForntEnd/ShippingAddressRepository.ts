import { Response } from "express";
import Customer from "../../../../models/Customer";
import ValidationHelper from "../../../../helpers/Validation";

class ShippingAddressRepository {
  constructor() {}

  async store(req: any, res: Response) {
    let authUser = req.authUser;
    let user: any = await Customer.findById(authUser._id);
    let { city, area, house, road, block, description, label } = req.body;

    await ValidationHelper.validate(req.body, {
      city: "required|string",
      area: "required|string",
      road: "required|string",
    });
    let address = [
      ...user.address,
      { city, area, house, road, block, description, label },
    ];
    user.address = address;
    let storeAddress = await user.save();

    if (storeAddress) return "Address inserted in database.";
  }
}

export default new ShippingAddressRepository();
