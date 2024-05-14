import PaymentGateWay from "../../../../models/PaymentGateWay";

class StripeCredentail {
  public credential: any;
  public isLive: boolean = false;

  constructor() {
    this.getCredentials();
  }

  async getCredentials() {
    let credential: any = await PaymentGateWay.findOne()
      .where("type")
      .equals("stripe");
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
}

export default StripeCredentail;
