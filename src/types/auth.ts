export type Role = 'farmer' | 'manager' | 'employee' | 'accountant';
export type UserStatus = 'pending' | 'active' | 'locked' | 'disabled';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  status: UserStatus;
  farmName?: string;
}

export const mockUsers: User[] = [
{
  id: '1',
  fullName: 'Nguyễn Văn A',
  email: 'test@example.com',
  role: 'farmer',
  status: 'active',
  farmName: 'Trang trại Xanh'
},
{
  id: '2',
  fullName: 'Trần Thị B',
  email: 'locked@example.com',
  role: 'manager',
  status: 'locked',
  farmName: 'Trang trại Xanh'
},
{
  id: '3',
  fullName: 'Lê Văn C',
  email: 'disabled@example.com',
  role: 'employee',
  status: 'disabled',
  farmName: 'Trang trại Xanh'
}];


export const validatePassword = (password: string): boolean => {
  // ≥ 8 characters, at least one uppercase letter, at least one number
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return minLength && hasUpperCase && hasNumber;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};