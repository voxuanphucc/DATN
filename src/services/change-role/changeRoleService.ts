/**
 * Change Role Service
 */

import axiosInstance from '../../config/axios';
import { type ChangeRoleRequest, type ChangeRoleResponse, type ApiResponse } from '../../types';

class ChangeRoleService {
  async changeRole(data: ChangeRoleRequest): Promise<ApiResponse<ChangeRoleResponse>> {
    const response = await axiosInstance.put(`/team/members/${data.memberId}/role`, {
      newRole: data.newRole,
    });
    return response.data;
  }
}

export const changeRoleService = new ChangeRoleService();
