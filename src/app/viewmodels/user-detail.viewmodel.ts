import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUser, IUserCreateRequest, IUserUpdateRequest, UserRole } from '../models/user.model';
import { UserService } from '../services/user.service';
import { BaseViewModel } from './base.viewmodel';

@Injectable()
export class UserDetailViewModel extends BaseViewModel implements OnDestroy {
  private _userSubject = new BehaviorSubject<IUser | null>(null);
  private _isEditingSubject = new BehaviorSubject<boolean>(false);
  private _destroy$ = new Subject<void>();

  readonly user$: Observable<IUser | null> = this._userSubject.asObservable();
  readonly isEditing$: Observable<boolean> = this._isEditingSubject.asObservable();

  readonly roles = Object.values(UserRole);

  constructor(private userService: UserService) {
    super();
  }

  get user(): IUser | null {
    return this._userSubject.value;
  }

  get isEditing(): boolean {
    return this._isEditingSubject.value;
  }

  async loadUserAsync(id: number): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.userService.getUserByIdAsync(id).toPromise();
      if (response?.success) {
        this._userSubject.next(response.data);
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка загрузки пользователя');
    } finally {
      this.setLoading(false);
    }
  }

  startEditing(): void {
    this._isEditingSubject.next(true);
  }

  cancelEditing(): void {
    this._isEditingSubject.next(false);
  }

  async saveUserAsync(request: IUserCreateRequest | IUserUpdateRequest): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      let response;
      if ('id' in request) {
        response = await this.userService.updateUserAsync(request as IUserUpdateRequest).toPromise();
      } else {
        response = await this.userService.createUserAsync(request as IUserCreateRequest).toPromise();
      }
      if (response?.success) {
        this._userSubject.next(response.data);
        this._isEditingSubject.next(false);
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка сохранения пользователя');
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
        this._userSubject.next(null);
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка удаления пользователя');
    } finally {
      this.setLoading(false);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
