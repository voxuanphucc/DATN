/**
 * Invite Member Service
 */

import axiosInstance from '../../config/axios';
import { type InviteMemberRequest, type InviteMemberResponse, type ApiResponse } from '../../types';

class InviteMemberService {
  async inviteMember(data: InviteMemberRequest): Promise<ApiResponse<InviteMemberResponse>> {
    const response = await axiosInstance.post('/team/invitations', data);
    return response.data;
  }
}

export const inviteMemberService = new InviteMemberService();
