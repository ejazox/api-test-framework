import { createApiRequest } from './api.utils.js';
import 'dotenv/config'
import { loginUser } from './auth.utils.js';

let globalToken = null;
export async function getAuthToken() {
  if (!globalToken) {
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;
    if(!username || !password) {
      throw new Error('Environment variables TEST_USERNAME or TEST_PASSWORD are missing');
    }
    globalToken = await loginUser(username,password);  
  }
  return globalToken;
}
