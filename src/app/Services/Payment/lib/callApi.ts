import { HeaderProps } from "./../types/index";

class CallApi {
  constructor() {}

  async postRequest(url: string, headers: any, postData: any) {
    let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: postData,
    });
    let data = await response.json();
    return data;
  }

  setHeaders(option: HeaderProps = null) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      username: option.userName || undefined,
      password: option.password || undefined,
      Authorization: option.authorization || undefined,
      "X-App-Key": option.appKey || undefined,
    };
  }
}

export default CallApi;
