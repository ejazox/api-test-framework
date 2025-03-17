import { test } from '@playwright/test';
import { TagsAPI } from './tags.api.js';
import { TagsAssertions } from './tags.asserts.js';
import { createApiRequest } from '../utils/api.utils.js';

test.describe('Tags API Tests', () => {
  let apiRequest;
  let tagsAPI;

  test.beforeAll(async () => {
    apiRequest = await createApiRequest();
    tagsAPI = new TagsAPI();
  });

  test('Verify fetching tags', async () => {
    const response = await tagsAPI.fetchTags(apiRequest);
    const responseBody = await response.json();
    TagsAssertions.validateTagsStructure(responseBody);
    console.log("Tags fetched successfully");
  });
});

