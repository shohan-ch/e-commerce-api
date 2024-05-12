import PaymentGateWay from "../../../../models/PaymentGateWay";

class BkashCredentail {
  public credential: any;
  public baseUrl: any;
  public isLive: boolean = false;

  constructor() {
    this.getCredentials().then(() => this.getBaseUrl());
  }

  async getCredentials() {
    let credential = await PaymentGateWay.findOne()
      .where("type")
      .equals("bkash");

    if (credential.isLiveActive) {
      this.isLive = true;
      this.credential = credential.liveCredentials;
    } else {
      this.credential = credential.sandboxCredentials;
    }
  }

  getBaseUrl() {
    if (this.isLive) {
      this.baseUrl = "https://.pay.bka.sh";
    } else {
      this.baseUrl = "https://.sandbox.bka.sh";
    }
  }
}

export default BkashCredentail;
