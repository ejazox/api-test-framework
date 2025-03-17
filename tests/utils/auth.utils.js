import { request } from '@playwright/test';
import { config } from '../config/testConfig.js';

export async function loginUser(email, password) {
  const apiRequest = await request.newContext();
  const response = await apiRequest.post(`${config.BASE_URL}/users/login`, {
    data: { user: { email, password } }
  });

  const responseBody = await response.json();
  return responseBody.user.token;
}
