/**
 * Schema Exports
 * 
 * This directory contains all Zod validation schemas:
 * 1. Form Schemas - Client-side form validation (reactive, with side effects)
 * 2. API Schemas - API request/response validation (pure validation)
 * 
 * When to use:
 * - FORM SCHEMAS: Validate user input in React forms (useForm, form state)
 * - API SCHEMAS: Validate API payloads before sending/receiving from backend
 */

// ─── FORM SCHEMAS (Client-side validation) ─────────────────────────────────
// Use for: React use-form hooks, form state management
export * from './auth.schemas';
export * from './login.schema';
export * from './register.schema';
export * from './forgot-password.schema';
export * from './reset-password.schema';
export * from './team.schema';

// ─── API SCHEMAS (Request/Response validation) ─────────────────────────────
// Use for: API calls, request/response validation, type safety
// Organized by feature (auth, user, team, plot, etc.)
export * from './auth';
