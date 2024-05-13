import PaymentGateWay from "../../../../models/PaymentGateWay";

class BkashCredentail {
  public credential: any;
  public baseUrl: any;
  public isLive: boolean = false;

  constructor() {
    this.getCredentials().then(() => this.getBaseUrl());
  }

  async getCredentials() {
    let credential: any = await PaymentGateWay.findOne()
      .where("type")
      .equals("bkash");
    let result = { ...credential._doc };

    if (credential.isLiveActive) {
      this.isLive = true;
      delete result.sandboxCredentials;
      result.appKey = result.liveCredentials.appKey;
      result.secret = result.liveCredentials.secret;
    } else {
      delete result.liveCredentials;
      result.appKey = result.sandboxCredentials.appKey;
      result.secret = result.sandboxCredentials.secret;
    }
    delete result.liveCredentials;
    delete result.sandboxCredentials;
    this.credential = result;
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
