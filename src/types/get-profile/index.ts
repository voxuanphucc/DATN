/**
 * Get Profile API Types
 */

export interface UserProfileDto {
  id: string;
  fullName: string;
  email: string;
  role: 'farmer' | 'manager' | 'employee';
  status: 'active' | 'pending' | 'locked' | 'disabled';
  farmName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
