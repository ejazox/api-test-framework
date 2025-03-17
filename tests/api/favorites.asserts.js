import { expect } from '@playwright/test';

export class FavoritesAssertions {
  // Validate the response structure for favorited articles
  static validateFavoriteResponseStructure(responseBody) {
    expect(responseBody).toHaveProperty('articles');
    expect(Array.isArray(responseBody.articles)).toBeTruthy();
    expect(responseBody).toHaveProperty('articlesCount');
    expect(responseBody.articlesCount).toBeGreaterThan(0);
  }

  // Validate an individual favorited article
  static validateFavoritedArticle(article) {
    expect(article).toHaveProperty('slug');
    expect(article).toHaveProperty('title');
    expect(article).toHaveProperty('description');
    expect(article).toHaveProperty('body');
    expect(article).toHaveProperty('tagList');
    expect(article).toHaveProperty('favorited');
    expect(article).toHaveProperty('favoritesCount');

    // Ensure the article is actually favorited
    expect(article.favorited).toBeTruthy();
    expect(article.favoritesCount).toBeGreaterThan(0);
  }
}
