import AlphaSms from "../providers/AlphaSms";

type ProviderType = "AlphaSms" | "Boomcast";

class SendSms {
  public provider: any;

  setProvider(type: ProviderType) {
    this.provider = import(`../providers/${type}`);
  }

  async send(number: string, message: string) {
    const { default: ProviderClass } = await this.provider;

    return await ProviderClass.init(number, message);
  }
}

export default SendSms;
