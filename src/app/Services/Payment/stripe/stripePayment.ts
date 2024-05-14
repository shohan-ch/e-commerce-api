import dbTransaction from "../core/dbTransaction";
import CallApi from "../lib/callApi";
import StripeCredentail from "./stripeCredentail";

class StripePayment extends StripeCredentail {
  public callApi: any;
  public merchantName: string = "ecommerce";

  constructor() {
    super();
    this.callApi = new CallApi();
  }

  async init(amount: number) {}
}

export default StripePayment;
