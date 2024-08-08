import { BaseApi } from "./base";

class ProfileApi extends BaseApi {
  getProfile() {
    return this.get('/profile');
  }
}

export const profileApi = new ProfileApi();