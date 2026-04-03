/**
 * Remove Member API Types
 */

export interface RemoveMemberRequest {
  memberId: string;
}

export interface RemoveMemberResponse {
  message: string;
  removedMemberId: string;
}
