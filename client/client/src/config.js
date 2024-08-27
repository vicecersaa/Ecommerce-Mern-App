const isDevelopment = process.env.REACT_APP_NODE_ENV === 'production';

export const API_URL = isDevelopment
    ? process.env.REACT_APP_PROD_PORT
    : process.env.REACT_APP_DEV_PORT;

export const HOST_PORT = isDevelopment
    ? process.env.REACT_APP_PROD_PORT
    : process.env.REACT_APP_DEV_HOST_PORT;
