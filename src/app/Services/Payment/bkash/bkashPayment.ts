import bkashCredentail from "./bkashCredentail";

class BkashPayment extends bkashCredentail {
  constructor() {
    super();
  }

  async init(data: number = null) {
    return this.credential;
  }
}

export default BkashPayment;
