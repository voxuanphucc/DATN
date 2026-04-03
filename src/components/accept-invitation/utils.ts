export const getRoleLabel = (role: string) => {
  switch (role) {
    case 'manager':
      return 'Quản lý'
    case 'employee':
      return 'Nhân viên'
    case 'accountant':
      return 'Kế toán'
    default:
      return role
  }
}
