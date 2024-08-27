import { BaseApi } from "@/api/base";

class UserApi extends BaseApi {
  getById(userId) {
    return this.get(`/users/${userId}`);
  }

  getPosts(userId) {
    return this.get(`/users/${userId}/posts`);
  }
}

export const userApi = new UserApi();