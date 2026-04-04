/**
 * Get Invitations Service
 */

import axiosInstance from '../../config/axios';
import { type GetInvitationsResponse } from '../../types/get-invitations';
import { type ApiResponse, type PaginationParams } from '../../types/common';

class GetInvitationsService {
  async getInvitations(params?: PaginationParams): Promise<ApiResponse<GetInvitationsResponse>> {
    const response = await axiosInstance.get('/team/invitations', { params });
    return response.data;
  }

  async cancelInvitation(invitationId: string): Promise<ApiResponse<{ message: string }>> {
    const response = await axiosInstance.delete(`/team/invitations/${invitationId}`);
    return response.data;
  }
}

export const getInvitationsService = new GetInvitationsService();
