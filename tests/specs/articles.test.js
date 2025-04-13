import { test,expect } from '@playwright/test';
import { ArticlesAPI } from '../api/articles.api.js';
import { ArticlesAssertions } from '../asserts/articles.asserts.js';
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
  });

  test('Verify fetching articles', async () => {
    const response = await articlesAPI.fetchArticles(apiRequest);
    const responseBody = await response.json();
    ArticlesAssertions.validateResponseStructure(responseBody);
    ArticlesAssertions.validateArticleStructure(responseBody.articles[0]);
    console.log("Articles fetched successfully");
  });

test.describe('Articles API Tests', () => {

  let articleSlug;
  const uniqueID = uuidv4();

  test('Create a new article', async () => {
    const articleData = {
      title: `New Playwright Article ${uniqueID}`,
      description: 'Automating API testing',
      body: `This is an article created by Ejaz with ID ${uniqueID}`,
      tagList: ['automation', 'testing']
    };

    // Create the article
    const response = await articlesAPI.createArticle(apiRequest, token, articleData);
    const responseBody = await response.json();
    articleSlug = responseBody.article.slug;
    // Validate article creation
    ArticlesAssertions.validateArticleCreation(responseBody, articleData.title);
    console.log("Article created successfully with slug:", articleSlug);
  });

  test('Edit an article', async () => {
    if (!articleSlug) {
      throw new Error("Article slug is not available, ensure article creation is successful.");
    }
    const updatedArticleData = {
      title: `New Updated data Articles ${uniqueID}`, // New title for the updated article
      description: "Test QAdd",
      body: "This article has been updated via Playwright API.",
      tagList: ['testing', 'automation', 'playwright'],
    };

    // Call the API to edit the article using the dynamic slug from the creation test
    const response = await articlesAPI.editArticle(apiRequest, token, articleSlug, updatedArticleData);
    const responseBody = await response.json();
    console.log("response body", responseBody);
    // Assert the article is updated
    expect(responseBody.article.title).toBe(updatedArticleData.title);
    expect(responseBody.article.description).toBe(updatedArticleData.description);
    expect(responseBody.article.body).toBe(updatedArticleData.body);
    expect(responseBody.article.tagList).toEqual(expect.arrayContaining(updatedArticleData.tagList));
    // Validate the edited article
    console.log(`Article with slug "${articleSlug}" edited successfully`);
  });
});

});
