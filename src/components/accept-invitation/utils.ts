export const getRoleLabel = (role: string) => {
  switch (role) {
    case 'manager':
      return 'Quản lý'
    case 'employee':
      return 'Nhân viên'
    default:
      return role
  }
}
