import AlphaSms from "../providers/AlphaSms";

type ProviderType = "Alphasms" | "Boomcast";

class SendSms {
  public provider: any;

  constructor(type: ProviderType) {
    this.provider = import(`../providers/${type}`);
  }

  async send(mobile: string, text: string) {
    const { default: ProviderClass } = await this.provider;

    return ProviderClass.init();
  }
}

export default SendSms;
