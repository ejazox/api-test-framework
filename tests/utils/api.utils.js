import { request } from '@playwright/test';

export async function createApiRequest() {
  return await request.newContext();
}