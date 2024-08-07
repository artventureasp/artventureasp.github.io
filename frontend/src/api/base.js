import { Axios } from "axios";

export class BaseApi {
  constructor() {
    this.client = new Axios({
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  checkResponse(response) {
    if (response.status >= 400) {
      throw response;
    }
  }

  parseResponse(response) {
    response.data = JSON.parse(response.data);
  }

  async post(url, data) {
    const response = await this.client.post(url, JSON.stringify(data));
    this.parseResponse(response);
    this.checkResponse(response);
    return response;
  }
}