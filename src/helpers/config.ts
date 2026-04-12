/**
 * Configuration object that exports all environment variables
 * In Next.js, client-side variables must be prefixed with NEXT_PUBLIC_
 */

function getDefaultAuthCookieMaxAgeSeconds(): number {
  const envValue = parseInt(process.env.NEXT_PUBLIC_AUTH_COOKIE_MAX_AGE_SECONDS || '', 10);
  return isNaN(envValue) ? 3600 : envValue;
}

const config = {
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
  },

  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4200',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000', 10),
  },

  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Smaller',
    environment: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    authCookieMaxAgeSeconds: getDefaultAuthCookieMaxAgeSeconds(),
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
};

export default config;
