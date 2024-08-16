import { BaseApi } from "./base";

class ProfileApi extends BaseApi {
  getProfile() {
    return this.get('/profile');
  }

  updateProfile({ username, about, isPublic, avatar }) {
    const form = new FormData();
    form.append('username', username);
    form.append('about', about);
    form.append('settings[public]', isPublic);
    form.append('avatar', avatar);
    return this.putForm('/profile', form);
  }

  getPosts() {
    return this.get('/profile/posts');
  }
}

export const profileApi = new ProfileApi();