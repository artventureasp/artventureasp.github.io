import { BaseApi } from "@/api/base";

class UserApi extends BaseApi {
  getById(userId) {
    return this.get(`/users/${userId}`);
  }

  getPosts(userId) {
    return this.get(`/users/${userId}/posts`);
  }

  updateFollowing(userId) {
    return this.put(`/users/${userId}/followers`);
  }
}

export const userApi = new UserApi();