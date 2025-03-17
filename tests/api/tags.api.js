import { config } from '../config/testConfig.js';

export class TagsAPI {
  constructor() {
    this.baseURL = config.BASE_URL;
  }

  async fetchTags(apiRequest) {
    return await apiRequest.get(`${this.baseURL}/tags`);
  }
}
