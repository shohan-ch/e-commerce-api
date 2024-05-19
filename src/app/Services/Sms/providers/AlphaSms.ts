class AlphaSms {
  constructor() {}

  baseUrl: string = "https://api.sms.net.bd";

  async init(number: string, message: string) {
    try {
      let url = this.baseUrl + "/sendsms";
      const postData = {
        api_key: "PX9lSV5XUyMJ7px4WO8r5ZqC5cxBN3kl5iPli1Bx",
        msg: message,
        to: number,
      };

      console.log(postData);
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
