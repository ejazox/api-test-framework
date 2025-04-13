import { expect } from '@playwright/test';

export class ArticlesAssertions {
  static validateResponseStructure(responseBody) {
    expect(responseBody).toHaveProperty('articles');
    expect(Array.isArray(responseBody.articles)).toBeTruthy();
    expect(responseBody).toHaveProperty('articlesCount');
    expect(responseBody.articlesCount).toBeGreaterThan(0);
  }

  static validateArticleStructure(article) {
    expect(article).toHaveProperty('slug');
    expect(article).toHaveProperty('title');
    expect(article).toHaveProperty('description');
    expect(article).toHaveProperty('body');
    expect(article).toHaveProperty('tagList');
  }

  static validateArticleCreation(responseBody, expectedTitle) {
    expect(responseBody.article.title).toBe(expectedTitle);
  }
  // Validate an individual article's details
  static validateEditedArticle(article, updatedData) {
    expect(article.title).toBe(updatedData.title);
    expect(article.description).toBe(updatedData.description);
    expect(article.body).toBe(updatedData.body);
    expect(article.tagList).toEqual(expect.arrayContaining(updatedData.tagList));
  }
}
