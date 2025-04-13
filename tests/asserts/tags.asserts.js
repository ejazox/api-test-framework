import { expect } from '@playwright/test';

export class TagsAssertions {
  static validateTagsStructure(responseBody) {
    expect(responseBody).toHaveProperty('tags');
    expect(Array.isArray(responseBody.tags)).toBeTruthy();
    expect(responseBody.tags.length).toBeGreaterThan(0);
  }
}
