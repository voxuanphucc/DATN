/**
 * Remove Member Service
 */

import axiosInstance from '../../config/axios';
import { type RemoveMemberRequest, type RemoveMemberResponse, type ApiResponse } from '../../types';

class RemoveMemberService {
  async removeMember(data: RemoveMemberRequest): Promise<ApiResponse<RemoveMemberResponse>> {
    const response = await axiosInstance.delete(`/team/members/${data.memberId}`);
    return response.data;
  }
}

export const removeMemberService = new RemoveMemberService();
