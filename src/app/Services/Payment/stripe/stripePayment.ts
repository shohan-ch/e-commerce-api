import dbTransaction from "../core/dbTransaction";
import CallApi from "../lib/callApi";
import bkashCredentail from "./stripeCredentail";

class StripePayment extends bkashCredentail {
  public callApi: any;
  public merchantName: string = "ecommerce";

  constructor() {
    super();
    this.callApi = new CallApi();
  }

  async init(amount: number) {}

  async grantToken() {
    let url = this.baseUrl + "/tokenized/checkout/token/grant";
    const { userName, password, appKey, secret } = this.credential;
    let headers = this.callApi.setHeaders({ userName, password });

    let postData = { app_key: appKey, app_secret: secret };
    let response = await this.callApi.postRequest(url, headers, postData);
    return response;
  }
}

export default StripePayment;
