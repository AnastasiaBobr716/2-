import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { IUser, IUserCreateRequest, IUserUpdateRequest } from '../models/user.model';
import { IApiResponse, IPaginatedResponse } from '../models/api-response.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {
  private mockUsers: IUser[] = [
    {
      id: 1,
      firstName: 'Иван',
      lastName: 'Петров',
      email: 'ivan.petrov@example.com',
      role: 'Admin' as any,
      createdAt: new Date('2024-01-15'),
      isActive: true
    },
    {
      id: 2,
      firstName: 'Мария',
      lastName: 'Сидорова',
      email: 'maria.sidorova@example.com',
      role: 'User' as any,
      createdAt: new Date('2024-02-20'),
      isActive: true
    },
    {
      id: 3,
      firstName: 'Алексей',
      lastName: 'Козлов',
      email: 'alexey.kozlov@example.com',
      role: 'Manager' as any,
      createdAt: new Date('2024-03-10'),
      isActive: false
    },
    {
      id: 4,
      firstName: 'Елена',
      lastName: 'Новикова',
      email: 'elena.novikova@example.com',
      role: 'User' as any,
      createdAt: new Date('2024-04-05'),
      isActive: true
    },
    {
      id: 5,
      firstName: 'Дмитрий',
      lastName: 'Волков',
      email: 'dmitry.volkov@example.com',
      role: 'Guest' as any,
      createdAt: new Date('2024-05-12'),
      isActive: true
    }
  ];

  private nextId = 6;

  getUsersAsync(): Observable<IApiResponse<IPaginatedResponse<IUser>>> {
    const response: IPaginatedResponse<IUser> = {
      items: [...this.mockUsers],
      totalCount: this.mockUsers.length,
      page: 1,
      pageSize: 10
    };
    return this.simulateNetworkDelay(this.createSuccessResponse(response, 'Пользователи загружены'));
  }

  getUserByIdAsync(id: number): Observable<IApiResponse<IUser>> {
    const user = this.mockUsers.find(u => u.id === id);
    if (!user) {
      return this.simulateError<IApiResponse<IUser>>(
        this.createErrorResponse('NOT_FOUND', `Пользователь с ID ${id} не найден`)
      );
    }
    return this.simulateNetworkDelay(this.createSuccessResponse(user, 'Пользователь найден'));
  }

  createUserAsync(request: IUserCreateRequest): Observable<IApiResponse<IUser>> {
    const newUser: IUser = {
      id: this.nextId++,
      ...request,
      createdAt: new Date(),
      isActive: true
    };
    this.mockUsers.push(newUser);
    return this.simulateNetworkDelay(this.createSuccessResponse(newUser, 'Пользователь создан'));
  }

  updateUserAsync(request: IUserUpdateRequest): Observable<IApiResponse<IUser>> {
    const index = this.mockUsers.findIndex(u => u.id === request.id);
    if (index === -1) {
      return this.simulateError<IApiResponse<IUser>>(
        this.createErrorResponse('NOT_FOUND', `Пользователь с ID ${request.id} не найден`)
      );
    }
    this.mockUsers[index] = { ...this.mockUsers[index], ...request };
    return this.simulateNetworkDelay(this.createSuccessResponse(this.mockUsers[index], 'Пользователь обновлён'));
  }

  deleteUserAsync(id: number): Observable<IApiResponse<boolean>> {
    const index = this.mockUsers.findIndex(u => u.id === id);
    if (index === -1) {
      return this.simulateError<IApiResponse<boolean>>(
        this.createErrorResponse('NOT_FOUND', `Пользователь с ID ${id} не найден`)
      );
    }
    this.mockUsers.splice(index, 1);
    return this.simulateNetworkDelay(this.createSuccessResponse(true, 'Пользователь удалён'));
  }

  searchUsersAsync(query: string): Observable<IApiResponse<IUser[]>> {
    const filtered = this.mockUsers.filter(u =>
      u.firstName.toLowerCase().includes(query.toLowerCase()) ||
      u.lastName.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    );
    return this.simulateNetworkDelay(this.createSuccessResponse(filtered, `Найдено ${filtered.length} пользователей`));
  }
}
