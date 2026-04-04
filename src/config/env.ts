/**
 * Environment variables configuration
 * All variables must be prefixed with VITE_ to be exposed to client-side code
 */

export const env = {
  // Google Maps API Key
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',

  // API Base URL (if needed)
  // apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
} as const;

// Type-safe access to environment variables
export const getEnv = <K extends keyof typeof env>(key: K): string => {
  const value = env[key];
  if (typeof value !== 'string') {
    return String(value);
  }
  return value;
};
