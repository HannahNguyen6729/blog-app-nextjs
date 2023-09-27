const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = isProduction ? process.env.NEXTAUTH_URL : '';
