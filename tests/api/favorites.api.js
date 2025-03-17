import { config } from '../config/testConfig.js';

export class FavoritesAPI {
  constructor() {
    this.baseURL = config.BASE_URL;
  }

  // Get user's favorited articles
  async getFavoriteArticles(apiRequest, username, limit = 10, offset = 0) {
    return await apiRequest.get(`${this.baseURL}/articles?favorited=${username}&limit=${limit}&offset=${offset}`);
  }

  // Favorite an article
  async favoriteArticle(apiRequest, token, slug) {
    return await apiRequest.post(`${this.baseURL}/articles/${slug}/favorite`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  // Unfavorite an article
  async unfavoriteArticle(apiRequest, token, slug) {
    return await apiRequest.delete(`${this.baseURL}/articles/${slug}/favorite`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
  }
}
