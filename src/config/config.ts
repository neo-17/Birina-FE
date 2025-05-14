const nodeEnv = import.meta.env.MODE || 'development';

export const config = {
    apiUrl: nodeEnv === 'development'
        ? import.meta.env.DEV_APP_URL
        : import.meta.env.PROD_APP_URL
};
