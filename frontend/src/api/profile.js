import { BaseApi } from "./base";

class ProfileApi extends BaseApi {
  getProfile() {
    return this.get('/profile');
  }

  getPosts() {
    return this.get('/profile/posts');
  }
}

export const profileApi = new ProfileApi();