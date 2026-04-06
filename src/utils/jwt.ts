/**
 * JWT Utility Functions
 * Decode JWT token to extract payload information (role, email, etc.)
 */

interface JwtPayload {
  sub?: string; // user id
  email?: string;
  role?: 'owner' | 'manager' | 'employee';
  iat?: number; // issued at
  exp?: number; // expiration
  [key: string]: unknown;
}

/**
 * Decode JWT token without verification
 * @param token - JWT access token
 * @returns Decoded payload or null if invalid
 */
export function decodeJwtToken(token: string): JwtPayload | null {
  try {
    // JWT format: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode payload (base64url)
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload) as JwtPayload;
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
}

/**
 * Get role from JWT token
 * @param token - JWT access token
 * @returns Role string or null
 */
export function getRoleFromToken(token: string | null): 'owner' | 'manager' | 'employee' | null {
  if (!token) return null;
  
  const payload = decodeJwtToken(token);
  return payload?.role || null;
}

/**
 * Check if token is expired
 * @param token - JWT access token
 * @returns true if expired, false otherwise
 */
export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  
  const payload = decodeJwtToken(token);
  if (!payload?.exp) return true;
  
  // exp is in seconds, Date.now() is in milliseconds
  return Date.now() >= payload.exp * 1000;
}
