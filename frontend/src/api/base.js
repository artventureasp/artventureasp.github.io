import { Axios } from "axios";

export class BaseApi {
  constructor() {
    this.client = new Axios({
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    this.client.interceptors.request.use(function (config) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
      return config;
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

  async get(url) {
    const response = await this.client.get(url);
    this.parseResponse(response);
    this.checkResponse(response);
    return response;
  }

  async post(url, data) {
    const response = await this.client.post(url, JSON.stringify(data));
    this.parseResponse(response);
    this.checkResponse(response);
    return response;
  }
}