/**
 * Configuration object that exports all environment variables
 * In Next.js, client-side variables must be prefixed with NEXT_PUBLIC_
 */

const {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_API_TIMEOUT,
  NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_AUTH_COOKIE_MAX_AGE_SECONDS,
  NEXT_PUBLIC_BASE_URL,
} = process.env;

function getDefaultAuthCookieMaxAgeSeconds(): number {
  const envValue = parseInt(NEXT_PUBLIC_AUTH_COOKIE_MAX_AGE_SECONDS || '', 10);
  return isNaN(envValue) ? 3600 : envValue;
}

const config = {
  firebase: {
    apiKey: NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: NEXT_PUBLIC_FIREBASE_APP_ID || '',
    measurementId: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
  },

  api: {
    baseUrl: NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4200',
    timeout: parseInt(NEXT_PUBLIC_API_TIMEOUT || '10000', 10),
  },

  app: {
    name: NEXT_PUBLIC_APP_NAME || 'Smaller',
    environment: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    authCookieMaxAgeSeconds: getDefaultAuthCookieMaxAgeSeconds(),
    baseURL: NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
};

export default config;
