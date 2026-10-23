import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export abstract class BaseViewModel {
  private _isLoadingSubject = new BehaviorSubject<boolean>(false);
  private _errorSubject = new BehaviorSubject<string | null>(null);

  readonly isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();
  readonly error$: Observable<string | null> = this._errorSubject.asObservable();

  get isLoading(): boolean {
    return this._isLoadingSubject.value;
  }

  get error(): string | null {
    return this._errorSubject.value;
  }

  protected setLoading(loading: boolean): void {
    this._isLoadingSubject.next(loading);
  }

  protected setError(error: string | null): void {
    this._errorSubject.next(error);
  }

  protected clearError(): void {
    this._errorSubject.next(null);
  }
}
