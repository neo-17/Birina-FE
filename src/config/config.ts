const nodeEnv = import.meta.env.MODE || 'development';

console.log(import.meta.env.VITE_DEV_APP_URL);
export const config = {
    apiUrl: nodeEnv === 'development'
        ? import.meta.env.VITE_DEV_APP_URL
        : import.meta.env.VITE_PROD_APP_URL
};
