/**
 * Get Members Service
 */

import axiosInstance from '../../config/axios';
import { type GetMembersResponse, type MemberDto, type ApiResponse, type PaginationParams } from '../../types';

class GetMembersService {
  async getMembers(params?: PaginationParams): Promise<ApiResponse<GetMembersResponse>> {
    const response = await axiosInstance.get('/team/members', { params });
    return response.data;
  }

  async getMember(memberId: string): Promise<ApiResponse<MemberDto>> {
    const response = await axiosInstance.get(`/team/members/${memberId}`);
    return response.data;
  }
}

export const getMembersService = new GetMembersService();
