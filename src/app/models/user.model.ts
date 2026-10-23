export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  isActive: boolean;
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Manager = 'Manager',
  Guest = 'Guest'
}

export interface IUserCreateRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface IUserUpdateRequest extends Partial<IUserCreateRequest> {
  id: number;
}
