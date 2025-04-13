import { test,expect } from '@playwright/test';
import { FavoritesAPI } from '../api/favorites.api.js';
import { FavoritesAssertions } from '../asserts/favorites.asserts.js';
import { createApiRequest } from '../utils/api.utils.js';
import { getAuthToken } from '../utils/authSetup.utils.js';

test.describe('Favorites API Tests', () => {
  let apiRequest;
  let favoritesAPI;
  let token;

  test.beforeAll(async () => {
    apiRequest = await createApiRequest();
    favoritesAPI = new FavoritesAPI();
    token = await getAuthToken(); 
  });

  test('Favorite an article', async () => {
    const slug = 'New-Playwright-Article-22521';
    const response = await favoritesAPI.favoriteArticle(apiRequest, token, slug);
    const responseBody = await response.json();
    FavoritesAssertions.validateFavoritedArticle(responseBody.article);
    expect(responseBody.article.favorited).toBeTruthy();
    console.log(`Article "${slug}" favorited successfully`);
  });
});
