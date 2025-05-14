import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';

export const config = {
    apiUrl: nodeEnv === 'development' ? process.env.DEV_APP_URL : process.env.PROD_APP_URL

}