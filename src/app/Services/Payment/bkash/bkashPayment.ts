import dbTransaction from "../core/dbTransaction";
import CallApi from "../lib/callApi";
import bkashCredentail from "./bkashCredentail";

class BkashPayment extends bkashCredentail {
  public callApi: any;
  public merchantName: string = "ecommerce";
  constructor() {
    super();
    this.callApi = new CallApi();
  }

  async init(amount: number) {
    const { id_token, refresh_token } = await this.grantToken();
    const createPaymentResponse = this.createPayment(id_token, amount);
    return createPaymentResponse;
  }

  async grantToken() {
    let url = this.baseUrl + "/tokenized/checkout/token/grant";
    const { userName, password, appKey, secret } = this.credential;
    let headers = this.callApi.setHeaders({ userName, password });

    let postData = { app_key: appKey, app_secret: secret };
    let response = await this.callApi.postRequest(url, headers, postData);
    return response;
  }

  async createPayment(idToken: string, amount: Number) {
    let url = this.baseUrl + "/tokenized/checkout/create";
    const { appKey } = this.credential;

    let headers = this.callApi.setHeaders({
      authorization: idToken,
      appKey,
    });

    let randomNumber = Math.floor(100000 + Math.random() * 900000).toString();

    let postData = {
      mode: "0011",
      payerReference: randomNumber,
      callbackURL: process.env.BASE_URL + "/api/v1/bkash-callback",
      amount: String(amount),
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: this.merchantName + randomNumber,
    };

    let response = await this.callApi.postRequest(url, headers, postData);

    return response;
  }

  bkashCallback(paymentID: string, status: string) {
    if (status === "success") {
      let response = this.executePayment(paymentID);
      dbTransaction.storePaymentDetails(response);
    } else if (status === "failure") {
      throw Error(
        "Bkash transaction are failure for some reason, please try again later"
      );
    } else {
      throw Error("Bkash payment are cancel");
    }
  }
  async executePayment(paymentID: string) {
    const { id_token, refresh_token } = await this.grantToken();
    let url = this.baseUrl + "/tokenized/checkout/execute";
    const { appKey } = this.credential;

    let headers = this.callApi.setHeaders({
      authorization: id_token,
      appKey,
    });

    let postData = {
      paymentID: paymentID,
    };

    let response = await this.callApi.postRequest(url, headers, postData);
    return response;
  }
}

export default BkashPayment;
