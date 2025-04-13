import { request } from '@playwright/test';
import { config } from '../config/testConfig.js';

export class ArticlesAPI {
  constructor() {
    this.baseURL = config.BASE_URL;
  }

  async fetchArticles(apiRequest, limit = 10, offset = 0) {
    return await apiRequest.get(`${this.baseURL}/articles?limit=${limit}&offset=${offset}`);
  }
async fetchArticle(apiRequest, token, slug) {
    const response = await apiRequest.get(`${config.BASE_URL}/articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response;
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

  
  async editArticle(apiRequest, token, slug, articleData) {
    // Fetch the article before updating it
    const response = await this.fetchArticle(apiRequest, token, slug);
    const responseBody = await response.json();
    
    // Check if the article exists
    if (responseBody.article) {
      console.log('Article before update:', responseBody.article);
  
      // Perform the update with new data
      const updateResponse = await apiRequest.put(
        `${config.BASE_URL}/articles/${slug}`,
        {
          data: {
            article: articleData,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return updateResponse;
    } else {
      throw new Error(`Article with slug ${slug} not found`);
    }
  }
    
}
