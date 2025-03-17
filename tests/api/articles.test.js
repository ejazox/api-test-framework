import { test } from '@playwright/test';
import { ArticlesAPI } from './articles.api.js';
import { ArticlesAssertions } from './articles.asserts.js';
import { createApiRequest } from '../utils/api.utils.js';
import { loginUser } from '../utils/auth.utils.js';
import { v4 as uuidv4 } from 'uuid';
import { getAuthToken } from '../utils/authSetup.utils.js';

test.describe('Articles API Tests', () => {
  let apiRequest;
  let articlesAPI;
  let token;

  test.beforeAll(async () => {
    apiRequest = await createApiRequest();
    articlesAPI = new ArticlesAPI();
    token = await getAuthToken();
    // token = await loginUser('ejaz.qa@gmail.com', 'Secret');
  });

  test('Verify fetching articles', async () => {
    const response = await articlesAPI.fetchArticles(apiRequest);
    const responseBody = await response.json();
    ArticlesAssertions.validateResponseStructure(responseBody);
    ArticlesAssertions.validateArticleStructure(responseBody.articles[0]);
    console.log("Articles fetched successfully");
  });

  test('Create a new article', async () => {
    const uniqueID = uuidv4();
    const articleData = {
      title: `New Playwright Article ${uniqueID}`,
      description: 'Automating API testing',
      body: `This is an article created by Ejaz with ID ${uniqueID}`,
      tagList: ['automation', 'testing']
    };

    const response = await articlesAPI.createArticle(apiRequest, token, articleData);
    const responseBody = await response.json();
    ArticlesAssertions.validateArticleCreation(responseBody, articleData.title);
    console.log("Article created successfully");
  });
});
