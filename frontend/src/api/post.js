import { BaseApi } from "@/api/base";

class PostApi extends BaseApi {
  createPost({ mood, topic, text, media }) {
    const form = new FormData();
    form.append('mood', mood);
    form.append('topic', topic);
    form.append('text', text);
    form.append('media', media);

    return this.postForm('/posts', form);
  }
}

export const postApi = new PostApi();