import { request } from '@playwright/test';
import { config } from '../config/testConfig.js';

export class ArticlesAPI {
  constructor() {
    this.baseURL = config.BASE_URL;
  }

  async fetchArticles(apiRequest, limit = 10, offset = 0) {
    return await apiRequest.get(`${this.baseURL}/articles?limit=${limit}&offset=${offset}`);
  }

  async createArticle(apiRequest, token, articleData) {
    return await apiRequest.post(`${this.baseURL}/articles`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      data: { article: articleData }
    });
  }
}
