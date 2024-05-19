import SmsConfig from "../../../../config/SmsConfig";

class AlphaSms {
  constructor() {}

  BaseUrl: string = SmsConfig.ALPHA_SMS.BASE_URL;
  ApiKey: string = SmsConfig.ALPHA_SMS.API_KEY;

  async init(number: string, message: string) {
    try {
      let url = this.BaseUrl + "/sendsms";
      const postData = {
        api_key: this.ApiKey,
        msg: message,
        to: number,
      };

      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error, "AlphaSms");
    }
  }
}

export default new AlphaSms();
