import { BaseApi } from "./base";

class ProfileApi extends BaseApi {
  getProfile() {
    return this.get('/profile');
  }

  updateProfile({ username, about, isPublic, avatar }) {
    const form = new FormData();
    form.append('username', username);
    form.append('settings[public]', isPublic);
    if (about != undefined) {
      form.append('about', about);
    }
    if (avatar) {
      form.append('avatar', avatar);
    }
    return this.putForm('/profile', form);
  }

  getPosts() {
    return this.get('/profile/posts');
  }
}

export const profileApi = new ProfileApi();