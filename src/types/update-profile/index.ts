/**
 * Update Profile API Types
 */

import { type UserProfileDto } from '../get-profile';

export interface UpdateProfileRequest {
  fullName?: string;
  avatar?: string;
  farmName?: string;
}

export interface UpdateProfileResponse {
  user: UserProfileDto;
  message: string;
}
