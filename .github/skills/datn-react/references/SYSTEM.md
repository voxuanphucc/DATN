# System Overview & Roles

## Các Vai Trò Trong Hệ Thống

| Vai Trò | Viết Tắt | Quyền Hạn |
|---------|----------|----------|
| **Chủ Trang Trại** | FARM_OWNER | Full access - quản lý tất cả |
| **Quản Lý Trang Trại** | FARM_MANAGER | Quản lý nhân sự, công việc, công cụ |
| **Nhân Công** | EMPLOYEE | Xem & thực hiện công việc được giao |
| **Quản Trị Viên** | ADMIN | Quản lý hệ thống, users |

## Role-based Checking

```typescript
// ✅ Utils function - Pure logic
const ROLE_HEIGHT = {
  ADMIN: 4,
  FARM_OWNER: 3,
  FARM_MANAGER: 2,
  EMPLOYEE: 1,
};

export const hasPermission = (userRole: string, requiredRole: string): boolean => {
  return (ROLE_HEIGHT[userRole as keyof typeof ROLE_HEIGHT] ?? 0) >= 
         (ROLE_HEIGHT[requiredRole as keyof typeof ROLE_HEIGHT] ?? 0);
};

// ✅ Hook - Side effect (redirect if no permission)
export const usePermissionCheck = (requiredRole: string) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user || !hasPermission(user.role, requiredRole)) {
      navigate('/forbidden');
    }
  }, [user?.role, requiredRole, navigate]);
};
```

## 9 Chức Năng Chính (Product Backlog)

### PB 01 - Đăng Ký
- Email + mật khẩu (≥8 ký tự, chữ hoa + số)
- Xác thực email (token hạn 24h, dùng 1 lần)
- Hook: `useRegisterMutation()` (React Query)
- Service: `RegisterService.register()`
- Schema: `RegisterRequestSchema`, `RegisterResponseSchema`

### PB 02 - Đăng Nhập
- Email + mật khẩu
- Phân quyền theo vai trò, redirect trang phù hợp
- Khóa tạm thời: 5 lần sai trong 15 phút
- Hook: `useLoginMutation()` + `useLogin()` (local state + lockout)
- Service: `LoginService.login()`

### PB 03 - Đặt Lại Mật Khẩu
- Quên mật khẩu: gửi email với token (hạn, dùng 1 lần)
- Đổi mật khẩu khi đã đăng nhập
- Hook: `useChangePasswordMutation()`, `useForgotPasswordMutation()`, `useResetPasswordMutation()`
- Service: `ChangePasswordService`, `ForgotPasswordService`, `ResetPasswordService`

### PB 04 - Mời Thành Viên
- Chủ trang trại mời người khác qua email
- Chọn vai trò: Quản lý / Nhân công
- Token mời (có hạn, dùng 1 lần)
- Hook: `useInviteMemberMutation()`, `useAcceptInvitationMutation()`
- Service: `InviteMemberService`, `AcceptInvitationService`

### PB 05 - Quản Lý Vai Trò & Xóa Thành Viên
- Thay đổi vai trò: yêu cầu xác nhận
- Xóa thành viên: cảnh báo nếu có công việc chưa hoàn thành
- Hook: `useChangeRoleMutation()`, `useRemoveMemberMutation()`, `useGetMembers()`
- Service: `ChangeRoleService`, `RemoveMemberService`, `GetMembersService`

### PB 06 - Quản Lý Lô Đất
- Tạo: tên, diện tích, mô tả, trạng thái
- Cập nhật: tên, diện tích, mô tả, trạng thái
- Xóa mềm (soft delete)
- Hook: `useGetPlots()`, `useCreatePlotMutation()`, `useUpdatePlotMutation()`
- Service: `PlotService`

### PB 07 - Vẽ Ranh Giới Lô Đất
- Vẽ polygon trên bản đồ vệ tinh
- Tự động tính diện tích (hectares)
- Chỉnh sửa: kéo điểm, thêm/xóa điểm
- Lưu dưới dạng **GeoJSON**
- Component: `PlotMapEditor.tsx` + Leaflet integration

### PB 08 - Quản Lý Hồ Sơ Phân Tích Đất
- Tạo: ngày lấy mẫu, pH, N, P, K, độ ẩm, ghi chú
- Xem lịch sử: danh sách + biểu đồ xu hướng
- Chỉnh sửa: chỉ trong 24h sau tạo
- Xóa mềm
- Hook: `useCreateSoilAnalysis()`, `useGetSoilAnalysisHistory()`, `useUpdateSoilAnalysis()`
- Service: `SoilAnalysisService`

### PB 09 - Upload & Gợi Ý Cây Trồng bằng AI
- Upload file: PDF, DOCX (max 10MB)
- Trích xuất: pH, N, P, K, độ ẩm
- AI gợi ý: danh sách cây, độ phù hợp (%)
- Hook: `useUploadSoilAnalysisFile()`, `useGetCropRecommendations()`
- Service: `SoilAnalysisFileService`

## User States & Transitions

```
User Flow:
pending (email not verified)
  ↓ [Verify email] → active (can use system)
  ↓ [Change password] → active ✓
  ↓ [Lock account or admin action] → locked
  ↓ [Admin disables] → disabled

Member in Farm:
pending (invitation sent, user accepted but role not finalized)
  ↓ [Accept invitation] → active
  ↓ [Change role] → active (new role)
  ↓ [Remove from farm] → [deleted]
```

## Feature-based Folder Organization

```
hooks/
├── auth/                    # Authentication hooks
│   ├── useLoginMutation.ts
│   ├── useRegisterMutation.ts
│   ├── useLogin.ts          # Local state + lockout tracking
│   └── index.ts
├── team-management/         # Team/member management
│   ├── useGetMembers.ts
│   ├── useInviteMember.ts
│   ├── useChangeRoleMutation.ts
│   └── index.ts
├── plot-management/         # Plot/farm management
│   ├── useGetPlots.ts
│   ├── useCreatePlotMutation.ts
│   └── index.ts
└── ...
```

## DateTime & Timezone Handling

- All timestamps stored in UTC
- Display in user's local timezone
- Use `date-fns` for formatting
- Example: `formatDistanceToNow(new Date(createdAt), { locale: viLocale })`
