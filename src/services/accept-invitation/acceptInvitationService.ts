/**
 * Accept Invitation Service
 */

import axiosInstance from '../../config/axios';
import {
  type AcceptInvitationRequest,
  type AcceptInvitationResponse,
} from '../../types/accept-invitation';
import { type InvitationDto } from '../../types/get-invitations';
import { type ApiResponse } from '../../types/common';

class AcceptInvitationService {
  async acceptInvitation(data: AcceptInvitationRequest): Promise<ApiResponse<AcceptInvitationResponse>> {
    const response = await axiosInstance.post('/team/invitations/accept', data);
    return response.data;
  }

  async verifyInvitation(token: string): Promise<ApiResponse<InvitationDto>> {
    const response = await axiosInstance.get(`/team/invitations/verify/${token}`);
    return response.data;
  }
}

export const acceptInvitationService = new AcceptInvitationService();
