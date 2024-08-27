import { BaseApi } from "@/api/base";

class UserApi extends BaseApi {
  getById(userId) {
    return this.get(`/users/${userId}`);
  }
}

export const userApi = new UserApi();