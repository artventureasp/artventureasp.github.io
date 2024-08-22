import { BaseApi } from "@/api/base";

class PostApi extends BaseApi {
  createPost({ mood, topic, text, media, options }) {
    const form = new FormData();
    form.append('mood', mood);
    form.append('topic', topic);
    form.append('text', text);
    form.append('options[public]', options.public);
    form.append('options[commentsOn]', options.commentsOn);
    form.append('media', media);

    return this.postForm('/posts', form);
  }

  getPostsFeed(page, filter) {
    return this.get('/posts', { page, filter });
  }
}

export const postApi = new PostApi();