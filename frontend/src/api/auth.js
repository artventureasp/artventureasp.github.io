import { BaseApi } from "@/api/base";

class AuthApi extends BaseApi {
  signup(data) {
    return this.post('/auth/signup', data);
  }

  signin(data) {
    return this.post('/auth/signin', data);
  }
}

export const authApi = new AuthApi();