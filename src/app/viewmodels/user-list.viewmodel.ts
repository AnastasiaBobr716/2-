import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser, IUserCreateRequest, IUserUpdateRequest } from '../models/user.model';
import { UserService } from '../services/user.service';
import { BaseViewModel } from './base.viewmodel';

@Injectable()
export class UserListViewModel extends BaseViewModel implements OnDestroy {
  private _usersSubject = new BehaviorSubject<IUser[]>([]);
  private _searchQuerySubject = new BehaviorSubject<string>('');
  private _destroy$ = new Subject<void>();

  readonly users$: Observable<IUser[]> = this._usersSubject.asObservable();
  readonly searchQuery$: Observable<string> = this._searchQuerySubject.asObservable();

  constructor(private userService: UserService) {
    super();
  }

  get users(): IUser[] {
    return this._usersSubject.value;
  }

  get searchQuery(): string {
    return this._searchQuerySubject.value;
  }

  async loadUsersAsync(): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.userService.getUsersAsync().toPromise();
      if (response?.success) {
        this._usersSubject.next(response.data.items);
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка загрузки пользователей');
    } finally {
      this.setLoading(false);
    }
  }

  async searchUsersAsync(query: string): Promise<void> {
    this._searchQuerySubject.next(query);
    if (!query.trim()) {
      await this.loadUsersAsync();
      return;
    }
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.userService.searchUsersAsync(query).toPromise();
      if (response?.success) {
        this._usersSubject.next(response.data);
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка поиска пользователей');
    } finally {
      this.setLoading(false);
    }
  }

  async deleteUserAsync(id: number): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.userService.deleteUserAsync(id).toPromise();
      if (response?.success) {
        await this.loadUsersAsync();
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка удаления пользователя');
    } finally {
      this.setLoading(false);
    }
  }

  async createUserAsync(request: IUserCreateRequest): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.userService.createUserAsync(request).toPromise();
      if (response?.success) {
        await this.loadUsersAsync();
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка создания пользователя');
    } finally {
      this.setLoading(false);
    }
  }

  async updateUserAsync(request: IUserUpdateRequest): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.userService.updateUserAsync(request).toPromise();
      if (response?.success) {
        await this.loadUsersAsync();
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка обновления пользователя');
    } finally {
      this.setLoading(false);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
