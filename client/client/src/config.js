const isDevelopment = process.env.REACT_APP_NODE_ENV === 'production';

export const API_URL = isDevelopment
    ? process.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL


