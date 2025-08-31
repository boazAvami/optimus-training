// src/api/env.ts
export const configuration = {
  VITE_ENV: process.env.VITE_ENV ?? 'development',
  VITE_API_BASE_URL: "http://localhost:3000",
  VITE_API_TIMEOUT: +(process.env.VITE_API_TIMEOUT ?? 10000),
};