import { Response } from "express";
import Customer from "../../../../models/Customer";
import ValidationHelper from "../../../../helpers/Validation";

class ShippingAddressRepository {
  constructor() {}

  async update(req: any, res: Response) {
    let authUser = req.authUser;
    let { addressId } = req.params;
    let { city, area, house, road, block, description, label } = req.body;

    let user: any = await Customer.findById(authUser._id);
    let findAddress = user.address.some(
      (address: any) => address._id == addressId
    );
    if (!findAddress) throw Error("Address id not found in database");

    await ValidationHelper.validate(req.body, {
      city: "required|string",
      area: "required|string",
      road: "required|string",
    });
    let updateAddress = user.address.filter((address: any) => {
      if (address._id == addressId) {
        address.city = city;
        address.area = area;
        address.house = house;
        address.road = road;
        address.block = block;
        address.description = description;
        address.label = label;
      }
      return address;
    });
    user.address = updateAddress;
    let updatAddress = await user.save();
    if (updatAddress) return "Address are updated successfully.";
  }

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
