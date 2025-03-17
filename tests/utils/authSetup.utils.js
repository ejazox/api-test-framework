import { createApiRequest } from './api.utils.js';
import { loginUser } from './auth.utils.js';

let globalToken = null;

export async function getAuthToken() {
  if (!globalToken) {
    globalToken = await loginUser('ejaz.qa@gmail.com', 'Secret');  
  }
  return globalToken;
}
