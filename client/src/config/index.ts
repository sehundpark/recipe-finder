const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return import.meta.env.DEV
    ? "http://localhost:3001/api"
    : "https://recipe-finder-9ale.onrender.com";
};

export const config = {
  apiBaseUrl: getApiBaseUrl(),
} as const;
