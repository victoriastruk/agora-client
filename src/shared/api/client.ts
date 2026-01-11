import { env } from '../utils';

const baseUrl = env.BACKEND_URL;

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // In development, use relative URLs for proxy
  // In production, use full URLs
  const isDevelopment = import.meta.env.DEV;
  const url = isDevelopment
    ? endpoint // Relative URL for proxy
    : endpoint.startsWith('http')
      ? endpoint
      : `${baseUrl}${endpoint}`; // Full URL for production

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  let data;
  if (response.ok) {
    try {
      data = await response.json();
    } catch (e) {
      data = { message: 'Success but failed to parse response' };
    }
  } else {
    // For error responses, try to get error details
    try {
      data = await response.json();
    } catch (e) {
      try {
        const text = await response.text();
        data = {
          error: text || `HTTP ${response.status}: ${response.statusText}`,
        };
      } catch (textError) {
        data = { error: `HTTP ${response.status}: ${response.statusText}` };
      }
    }
  }

  if (!response.ok) {
    if (endpoint.includes('/auth/') || endpoint === '/me') {
      return data as T;
    }
    throw new Error(data.message || `HTTP ${response.status}`);
  }

  return data as T;
}

export const apiClient = { request };
